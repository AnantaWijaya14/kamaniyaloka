import type { MetadataRoute } from "next";
import { pages } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  if (!base) return [];
  return ["id", "en"].flatMap((lang) =>
    [...pages, "villas/a", "villas/b", "villas/c"].map((p) => ({
      url: `${base.replace(/\/$/, "")}/${lang}${p ? "/" + p : ""}`,
    })),
  );
}
