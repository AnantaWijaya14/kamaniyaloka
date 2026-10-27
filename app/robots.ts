import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  return {
    rules: base
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    ...(base ? { sitemap: base + "/sitemap.xml" } : {}),
  };
}
