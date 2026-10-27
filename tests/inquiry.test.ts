import { test } from "node:test";
import assert from "node:assert/strict";
import { validate, summary, whatsapp, type Inquiry } from "../lib/inquiry.ts";
const valid: Inquiry = {
  name: "Test Guest",
  phone: "+628123456789",
  email: "",
  villa: "a",
  date: "2030-01-01",
  duration: "monthly",
  guests: "4",
  message: "Hello & welcome",
  consent: true,
};
test("valid inquiry and villa capacities", () => {
  assert.deepEqual(validate(valid, "2029-12-31"), []);
  assert.ok(validate({ ...valid, guests: "5" }).includes("guests"));
  assert.deepEqual(validate({ ...valid, villa: "c", guests: "6" }), []);
  assert.ok(validate({ ...valid, guests: "1.5" }).includes("guests"));
});
test("rejects past or impossible dates, missing consent and invalid contact", () => {
  for (const [key, value] of Object.entries({
    date: "2020-01-01",
    phone: "081234",
    consent: false,
    email: "bad",
    name: " ",
  })) {
    assert.ok(validate({ ...valid, [key]: value }).includes(key));
  }
  assert.ok(validate({ ...valid, date: "2030-02-31" }).includes("date"));
});
test("localized handoff preserves message and correct recipient", () => {
  for (const lang of ["id", "en"]) {
    const text = summary(valid, lang);
    const url = new URL(whatsapp(text));
    assert.equal(url.pathname, "/6285965932071");
    assert.equal(url.searchParams.get("text"), text);
    assert.ok(text.includes("Hello & welcome"));
    assert.ok(text.includes(lang === "id" ? "Bulanan" : "Monthly"));
  }
});
