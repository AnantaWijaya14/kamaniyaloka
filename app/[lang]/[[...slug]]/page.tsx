import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Site from "@/components/site";
import { pages, navigation, type Lang } from "@/lib/content";
type Props = { params: Promise<{ lang: string; slug?: string[] }> };
const routes = [...pages, "villas/a", "villas/b", "villas/c"];
export function generateStaticParams() {
  return ["id", "en"].flatMap((lang) =>
    routes.map((path) => ({ lang, slug: path ? path.split("/") : [] })),
  );
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug = [] } = await params;
  const path = slug.join("/");
  const title =
    (navigation[lang as Lang]?.[pages.indexOf(path)] ||
      "Villa " + slug.at(-1)?.toUpperCase()) + " | Kamaniyaloka";
  const description =
    lang === "id"
      ? "Tiga villa pribadi di Kerobokan Kelod, Bali. Pilihan 2 dan 3 kamar tidur, furnished dan unfurnished. Inquiry sewa bulanan dan tahunan."
      : "Three private villas in Kerobokan Kelod, Bali. Furnished and unfurnished 2 and 3 bedroom homes. Monthly and yearly rental inquiries.";
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  return {
    title,
    description,
    robots: base
      ? { index: true, follow: true }
      : { index: false, follow: false },
    ...(base
      ? {
          metadataBase: new URL(base),
          alternates: {
            canonical: `/${lang}/${path}`,
            languages: { id: `/id/${path}`, en: `/en/${path}` },
          },
        }
      : {}),
    openGraph: {
      title,
      description,
      type: "website",
      locale: lang === "id" ? "id_ID" : "en_US",
      siteName: "Kamaniyaloka",
    },
  };
}
export default async function Page({ params }: Props) {
  const { lang, slug = [] } = await params;
  const path = slug.join("/");
  if (!["id", "en"].includes(lang) || !routes.includes(path)) notFound();
  return <Site lang={lang as Lang} path={path} />;
}
