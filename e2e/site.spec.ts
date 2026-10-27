import { test, expect } from "@playwright/test";
import { mkdirSync } from "node:fs";
const review = process.env.REVIEW_OUTPUT_DIR || "test-results/review";
mkdirSync(review, { recursive: true });
test("all bilingual routes render without browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const lang of ["id", "en"])
    for (const path of [
      "",
      "about",
      "villas",
      "villas/a",
      "villas/b",
      "villas/c",
      "facilities",
      "gallery",
      "inquiry",
      "location",
      "contact",
    ]) {
      const response = await page.goto(`/${lang}/${path}`);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
    }
  expect(errors).toEqual([]);
});
test("inquiry validates and prepares correct WhatsApp link", async ({
  page,
}) => {
  await page.goto("/id/inquiry?villa=c");
  await expect(page.locator("#villa")).toHaveValue("c");
  await page.getByRole("button", { name: "Siapkan inquiry" }).click();
  await expect(page.locator("#name-error")).toBeVisible();
  await page.locator("#name").fill("Review Guest");
  await page.locator("#phone").fill("+628123456789");
  await page.locator("#date").fill("2030-01-01");
  await page.locator("#guests").fill("6");
  await page.locator("#consent").check();
  await page.getByRole("button", { name: "Siapkan inquiry" }).click();
  const href = await page
    .getByRole("link", { name: "Buka WhatsApp" })
    .getAttribute("href");
  expect(href).toContain("https://wa.me/6285965932071?text=");
  expect(decodeURIComponent(href!)).toContain("Villa: C");
  await page.locator("#villa").selectOption("a");
  await expect(page.locator(".summary")).toHaveCount(0);
  await page.getByRole("button", { name: "Siapkan inquiry" }).click();
  await expect(page.locator("#guests-error")).toBeVisible();
});
test("responsive review and mobile navigation", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/id");
  await page.screenshot({ path: review + "/desktop.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ["", "villas", "inquiry", "facilities", "gallery"]) {
    await page.goto("/id/" + path);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.goto("/id");
  await page.screenshot({ path: review + "/mobile.png", fullPage: true });
  await page.getByRole("button", { name: "Menu navigasi" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Villa Kami" })
    .click();
  await expect(page).toHaveURL(/\/id\/villas$/);
  await page.getByRole("link", { name: "EN", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/villas$/);
  await expect(page.locator("h1")).toHaveText("Choose how you settle in.");
});
