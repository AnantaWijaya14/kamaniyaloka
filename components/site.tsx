"use client";
import Link from "next/link";
import PhotoGallery from "./photo-gallery";
import { photos } from "@/lib/media";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Waves,
  Leaf,
  BedDouble,
  Users,
  MapPin,
  Check,
  Sun,
  Instagram,
} from "lucide-react";
import {
  address,
  navigation,
  pages,
  villas,
  pick,
  type Lang,
  type Villa,
} from "@/lib/content";
import {
  today,
  validate,
  summary,
  whatsapp,
  type Inquiry,
} from "@/lib/inquiry";
export default function Site({ lang, path }: { lang: Lang; path: string }) {
  const t = (id: string, en: string) => pick(lang, id, en);
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState("all");
  const href = (p = "") => `/${lang}${p ? "/" + p : ""}`;
  const cta = (villa?: string) => (
    <Link
      className="button"
      href={href("inquiry") + (villa ? "?villa=" + villa : "")}
    >
      {t("Tanyakan Ketersediaan", "Inquire About Your Stay")}
      <ArrowUpRight size={17} />
    </Link>
  );
  function Art({ small = false }: { small?: boolean }) {
    return (
      <div
        className={"art " + (small ? "small" : "")}
        aria-label={t(
          "Ilustrasi abstrak, bukan foto properti",
          "Abstract illustration, not a property photograph",
        )}
      >
        <div className="sun" />
        <div className="arch" />
        <div className="pool" />
        <div className="palm p1" />
        <div className="palm p2" />
        <span className="art-label">
          {t(
            "ILUSTRASI SUASANA · FOTO SEGERA HADIR",
            "MOOD ILLUSTRATION · PHOTOGRAPHY COMING SOON",
          )}
        </span>
      </div>
    );
  }
  function Card({ villa: v }: { villa: Villa }) {
    return (
      <article className="villa-card">
        <Link
          href={href("villas/" + v.id)}
          aria-label={"Villa " + v.id.toUpperCase()}
        >
          <div className={"card-art tone-" + v.id}>
            <Art small />
            <span className="tag">
              {v.furnished ? "FULLY FURNISHED" : "UNFURNISHED"}
            </span>
          </div>
        </Link>
        <div className="card-body">
          <div className="card-title">
            <h3>Villa {v.id.toUpperCase()}</h3>
            <Link
              aria-label={t("Lihat detail", "View details")}
              href={href("villas/" + v.id)}
            >
              <ArrowUpRight />
            </Link>
          </div>
          <div className="specs">
            <span>
              <BedDouble size={16} />
              {v.beds} {t("kamar", "bedrooms")}
            </span>
            <span>
              <Users size={16} />
              {v.guests} {t("orang", "residents")}
            </span>
          </div>
          <p>
            {v.furnished
              ? t(
                  "Lengkap untuk memulai keseharian baru.",
                  "Furnished for your next chapter.",
                )
              : t(
                  "Ruang untuk sentuhan personal Anda.",
                  "A space to make your own.",
                )}
          </p>
          <div className="card-bottom">
            <span>
              {v.furnished
                ? t("Sewa bulanan", "Monthly rental")
                : t("Sewa tahunan", "Yearly rental")}
            </span>
            <Link href={href("villas/" + v.id)}>
              {t("Jelajahi", "Explore")} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </article>
    );
  }
  const heading = (eyebrow: string, title: string, description?: string) => (
    <div className="page-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
  const selected = villas.find((v) => path === "villas/" + v.id);
  return (
    <html lang={lang}>
      <body>
        <a className="skip" href="#main">
          {t("Lewati ke konten", "Skip to content")}
        </a>
        <header>
          <Link className="brand" href={href()}>
            <Sun size={31} strokeWidth={1} />
            <span>
              KAMANIYALOKA<small>PRIVATE VILLAS · BALI</small>
            </span>
          </Link>
          <nav
            className={menu ? "open" : ""}
            aria-label={t("Navigasi utama", "Main navigation")}
          >
            {[0, 1, 2, 3, 4, 6, 7].map((i) => (
              <Link
                key={i}
                aria-current={path === pages[i] ? "page" : undefined}
                href={href(pages[i])}
                onClick={() => setMenu(false)}
              >
                {navigation[lang][i]}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link
              className="language"
              href={`/${lang === "id" ? "en" : "id"}${path ? "/" + path : ""}`}
              lang={lang === "id" ? "en" : "id"}
            >
              {lang === "id" ? "EN" : "ID"}
            </Link>
            <Link className="nav-cta" href={href("inquiry")}>
              {t("Inquiry Sewa", "Inquire Now")}
              <ArrowUpRight size={15} />
            </Link>
            <button
              className="menu"
              aria-expanded={menu}
              aria-label={t("Menu navigasi", "Navigation menu")}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </header>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              name: "Kamaniyaloka",
              telephone: "+6285965932071",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Jl. Pengubengan Kauh, Gg. Tualen",
                addressLocality: "Kerobokan Kelod, Kuta Utara, Badung",
                addressRegion: "Bali",
                postalCode: "80363",
                addressCountry: "ID",
              },
              sameAs: ["https://www.instagram.com/kamaniyaloka.villa/"],
            }).replace(/</g, "\\u003c"),
          }}
        />
        <main id="main">
          {path === "" && (
            <>
              <section className="hero">
                <div className="hero-copy">
                  <span className="eyebrow light">
                    <span /> KEROBOKAN KELOD, BALI
                  </span>
                  <h1>
                    {t("Ruang untuk", "A place to")}
                    <br />
                    <em>{t("hidup lebih tenang.", "live a little slower.")}</em>
                  </h1>
                  <p>
                    {t(
                      "Temukan ritme Anda di Bali. Tiga villa pribadi, ruang yang hangat, dan kemungkinan untuk tinggal lebih lama.",
                      "Find your own rhythm in Bali. Three private villas, room to settle in, and the possibility of staying a little longer.",
                    )}
                  </p>
                  {cta()}
                  <Link className="hero-link" href={href("villas")}>
                    {t("Kenali villa kami", "Discover our villas")}{" "}
                    <ArrowRight size={16} />
                  </Link>
                  <div className="hero-bottom">
                    <span>KEROBOKAN · BALI</span>
                    <span>
                      {t(
                        "RUANG PRIBADI. RITME ANDA.",
                        "PRIVATE SPACES. YOUR OWN PACE.",
                      )}
                    </span>
                  </div>
                </div>
                <Art />
              </section>
              <div className="feature-bar">
                <span>
                  <Waves />
                  {t(
                    "Kolam renang pribadi di setiap villa",
                    "A private pool in every villa",
                  )}
                </span>
                <span>
                  <Leaf />
                  {t(
                    "Tiga ruang, karakter berbeda",
                    "Three spaces, individual character",
                  )}
                </span>
                <span>
                  <Sun />
                  {t(
                    "Pilihan sewa bulanan & tahunan",
                    "Monthly & yearly rental options",
                  )}
                </span>
              </div>
              <section className="intro section">
                <div>
                  <span className="eyebrow">
                    {t(
                      "SELAMAT DATANG DI KAMANIYALOKA",
                      "WELCOME TO KAMANIYALOKA",
                    )}
                  </span>
                  <h2>
                    {t("Bukan sekadar singgah.", "More than a stay.")}
                    <br />
                    <em>
                      {t(
                        "Ruang untuk merasa di rumah.",
                        "Room to feel at home.",
                      )}
                    </em>
                  </h2>
                </div>
                <div>
                  <p>
                    {t(
                      "Di Kerobokan Kelod, Kamaniyaloka menghadirkan tiga villa dengan kolam renang pribadi. Pilih kenyamanan unit furnished atau wujudkan ruang Anda sendiri di unit unfurnished.",
                      "In Kerobokan Kelod, Kamaniyaloka brings together three villas with private pools. Choose a furnished home or shape your own space in an unfurnished villa.",
                    )}
                  </p>
                  <Link className="text-link" href={href("about")}>
                    {t("Mengenal Kamaniyaloka", "Meet Kamaniyaloka")}
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
              </section>
              <section className="section villas-section">
                <div className="section-top">
                  <div>
                    <span className="eyebrow">
                      {t("KOLEKSI VILLA", "THE VILLA COLLECTION")}
                    </span>
                    <h2>{t("Temukan ruang Anda.", "Find your place.")}</h2>
                  </div>
                  <span className="muted">
                    {t(
                      "03 villa pribadi · 02 & 03 kamar tidur",
                      "03 private villas · 02 & 03 bedrooms",
                    )}
                  </span>
                </div>
                <div className="villa-grid">
                  {villas.map((v) => (
                    <Card key={v.id} villa={v} />
                  ))}
                </div>
                <p className="note">
                  {t(
                    "Harga dan ketersediaan dikonfirmasi langsung oleh admin. Durasi lain dapat didiskusikan.",
                    "Rates and availability are confirmed directly by our team. Other rental periods can be discussed.",
                  )}
                </p>
              </section>
              <section className="location-band">
                <MapPin size={35} strokeWidth={1} />
                <div>
                  <span className="eyebrow">KEROBOKAN KELOD</span>
                  <h2>
                    {t(
                      "Sudut Bali untuk keseharian Anda.",
                      "Your everyday corner of Bali.",
                    )}
                  </h2>
                </div>
                <Link className="text-link" href={href("location")}>
                  {t("Jelajahi lokasi", "Explore the location")}
                  <ArrowUpRight />
                </Link>
              </section>
            </>
          )}
          {path === "about" && (
            <section className="section">
              {heading(
                t("TENTANG KAMI", "ABOUT US"),
                t(
                  "Tiga villa. Satu tempat untuk pulang.",
                  "Three villas. A place to call home.",
                ),
                t(
                  "Ruang pribadi untuk babak baru kehidupan Anda di Bali.",
                  "Private spaces for your next chapter in Bali.",
                ),
              )}
              <div className="split">
                <Art />
                <div className="prose">
                  <h2>{t("Kenali Kamaniyaloka", "Meet Kamaniyaloka")}</h2>
                  <p>
                    {t(
                      "Kamaniyaloka adalah koleksi tiga villa di Kerobokan Kelod, Kuta Utara. Dua villa memiliki dua kamar tidur, dan satu villa memiliki tiga kamar tidur. Setiap unit dilengkapi kolam renang dan parkir pribadi.",
                      "Kamaniyaloka is a collection of three villas in Kerobokan Kelod, North Kuta. Two villas offer two bedrooms, and one offers three bedrooms. Each includes a private swimming pool and private parking.",
                    )}
                  </p>
                  <p>
                    {t(
                      "Villa A tersedia fully furnished dengan preferensi sewa bulanan. Villa B dan C tersedia unfurnished dengan preferensi sewa tahunan. Kebutuhan durasi lain dapat dibicarakan bersama admin.",
                      "Villa A is fully furnished, primarily for monthly rentals. Villas B and C are unfurnished, primarily for yearly rentals. Other durations can be discussed with our team.",
                    )}
                  </p>
                  {cta()}
                </div>
              </div>
            </section>
          )}
          {path === "villas" && (
            <section className="section">
              {heading(
                t("VILLA KAMI", "OUR VILLAS"),
                t("Pilih cara Anda tinggal.", "Choose how you settle in."),
                t(
                  "Tiga unit individual. Fasilitas, kapasitas, dan karakter yang jelas.",
                  "Three individual homes. Clear amenities, capacities, and character.",
                ),
              )}
              <div className="villa-grid">
                {villas.map((v) => (
                  <Card key={v.id} villa={v} />
                ))}
              </div>
            </section>
          )}
          {selected && (
            <section className="section">
              <Link className="text-link" href={href("villas")}>
                ← {t("Semua villa", "All villas")}
              </Link>
              {heading(
                selected.furnished ? "FULLY FURNISHED" : "UNFURNISHED",
                "Villa " + selected.id.toUpperCase(),
                `${selected.beds} ${t("kamar tidur", "bedrooms")} · ${selected.guests} ${t("penghuni", "residents")}`,
              )}
              <div className="split">
                <Art />
                <div className="prose">
                  <h2>
                    {selected.furnished
                      ? t(
                          "Siap untuk keseharian Anda.",
                          "Ready for your everyday.",
                        )
                      : t("Hadirkan sentuhan Anda.", "Make it your own.")}
                  </h2>
                  <p>
                    {selected.furnished
                      ? t(
                          "Preferensi sewa bulanan.",
                          "Monthly rentals preferred.",
                        )
                      : t(
                          "Preferensi sewa tahunan.",
                          "Yearly rentals preferred.",
                        )}{" "}
                    {t(
                      "Durasi lain sesuai kesepakatan. Hubungi admin untuk harga, ketersediaan, deposit, dan ketentuan sewa.",
                      "Other durations by agreement. Contact our team for rates, availability, deposits, and rental terms.",
                    )}
                  </p>
                  {cta(selected.id)}
                  <p className="note">
                    {t(
                      "Inquiry akan ditinjau admin. Tidak ada konfirmasi sewa otomatis.",
                      "Inquiries are reviewed by our team. Rental confirmation is not automatic.",
                    )}
                  </p>
                </div>
              </div>
              <h2 className="spaced">
                {t("Fasilitas unit ini", "Amenities in this villa")}
              </h2>
              <ul className="amenities">
                {selected.amenities.map((a) => (
                  <li key={a[0]}>
                    <Check size={17} />
                    {a[lang === "id" ? 0 : 1]}
                  </li>
                ))}
              </ul>
              <p className="note">
                {t(
                  "Fasilitas yang tidak tercantum belum dikonfirmasi.",
                  "Amenities not listed have not been confirmed.",
                )}
              </p>
            </section>
          )}
          {path === "facilities" && (
            <section className="section">
              {heading(
                t("FASILITAS", "AMENITIES"),
                t("Detail yang membuat nyaman.", "Comfort is in the details."),
                t(
                  "Fasilitas terkonfirmasi, ditampilkan per unit agar mudah dibandingkan.",
                  "Confirmed amenities, listed by villa for easy comparison.",
                ),
              )}
              <div className="villa-grid">
                {villas.map((v) => (
                  <article className="amenity-card" key={v.id}>
                    <h2>Villa {v.id.toUpperCase()}</h2>
                    <p>{v.furnished ? "Fully furnished" : "Unfurnished"}</p>
                    <ul>
                      {v.amenities.map((a) => (
                        <li key={a[0]}>
                          <Check size={15} />
                          {a[lang === "id" ? 0 : 1]}
                        </li>
                      ))}
                    </ul>
                    <Link className="text-link" href={href("villas/" + v.id)}>
                      {t("Detail villa", "Villa details")}
                      <ArrowUpRight size={17} />
                    </Link>
                  </article>
                ))}
              </div>
              <p className="note">
                {t(
                  "Fasilitas yang tidak tercantum belum dikonfirmasi, bukan berarti tidak tersedia.",
                  "Unlisted amenities are unconfirmed, not necessarily unavailable.",
                )}
              </p>
            </section>
          )}
          {path === "gallery" && (
            <section className="section">
              {heading(
                t("GALERI", "GALLERY"),
                t("Kenali setiap sudut.", "Get to know every corner."),
                t(
                  "Foto resmi villa sedang dipersiapkan. Ilustrasi berikut bukan representasi properti.",
                  "Official villa photography is being prepared. The illustrations below do not represent the property.",
                ),
              )}
              <div className="filters">
                {["all", "a", "b", "c"].map((v) => (
                  <button
                    key={v}
                    aria-pressed={filter === v}
                    onClick={() => setFilter(v)}
                  >
                    {v === "all"
                      ? t("Semua villa", "All villas")
                      : "Villa " + v.toUpperCase()}
                  </button>
                ))}
              </div>
              <PhotoGallery lang={lang} filter={filter} />
              {photos.length === 0 && (
                <div className="villa-grid">
                  {villas
                    .filter((v) => filter === "all" || v.id === filter)
                    .map((v) => (
                      <div key={v.id}>
                        <Art small />
                        <h3>Villa {v.id.toUpperCase()}</h3>
                        <p className="muted">
                          {t(
                            "Foto asli segera hadir",
                            "Official photography coming soon",
                          )}
                        </p>
                      </div>
                    ))}
                </div>
              )}
            </section>
          )}
          {path === "inquiry" && (
            <section className="section">
              {heading(
                "RENTAL INQUIRY",
                t(
                  "Awal dari tinggal lebih lama.",
                  "The start of a longer stay.",
                ),
                t(
                  "Ceritakan rencana Anda. Admin akan membantu mengecek harga dan ketersediaan.",
                  "Tell us your plans. Our team will help with pricing and availability.",
                ),
              )}
              <div className="inquiry-layout">
                <InquiryForm lang={lang} />
                <aside>
                  <span className="eyebrow">
                    {t("CARA KERJANYA", "HOW IT WORKS")}
                  </span>
                  {[
                    t(
                      "Pilih villa & isi rencana sewa",
                      "Choose a villa & share your plans",
                    ),
                    t("Tinjau ringkasan inquiry", "Review your inquiry"),
                    t(
                      "Buka WhatsApp & tekan Kirim",
                      "Open WhatsApp & press Send",
                    ),
                  ].map((s, i) => (
                    <p className="step" key={s}>
                      <b>0{i + 1}</b>
                      {s}
                    </p>
                  ))}
                  <p className="note">
                    {t(
                      "Formulir ini tidak mengecek ketersediaan real-time atau mengonfirmasi pemesanan. Harga dan ketentuan disepakati langsung dengan admin.",
                      "This form does not check real-time availability or confirm a reservation. Rates and terms are agreed directly with our team.",
                    )}
                  </p>
                  <hr />
                  <p>
                    WhatsApp
                    <br />
                    <strong>+62 859-6593-2071</strong>
                  </p>
                </aside>
              </div>
            </section>
          )}
          {path === "location" && (
            <section className="section">
              {heading(
                "KEROBOKAN KELOD, BALI",
                t("Temukan kami di Bali.", "Find us in Bali."),
              )}
              <div className="split">
                <div className="map-art">
                  <MapPin size={60} strokeWidth={1} />
                  <h2>Kerobokan Kelod</h2>
                  <span>BALI · INDONESIA</span>
                </div>
                <div className="prose">
                  <h2>{t("Alamat Kamaniyaloka", "Our address")}</h2>
                  <p>{address}</p>
                  <a
                    className="button"
                    href={
                      "https://www.google.com/maps/search/?api=1&query=" +
                      encodeURIComponent(address)
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t(
                      "Cari alamat di Google Maps",
                      "Search address on Google Maps",
                    )}
                    <ArrowUpRight size={18} />
                  </a>
                  <p className="note">
                    {t(
                      "Tautan membuka pencarian alamat. Pin resmi dan petunjuk kedatangan perlu dikonfirmasi dengan admin sebelum berkunjung.",
                      "This link opens an address search. Confirm the official pin and arrival directions with our team before visiting.",
                    )}
                  </p>
                </div>
              </div>
            </section>
          )}
          {path === "contact" && (
            <section className="section">
              {heading(
                t("HUBUNGI KAMI", "CONTACT US"),
                t("Mari mulai percakapan.", "Let’s start a conversation."),
                t(
                  "Untuk rencana sewa, informasi villa, dan penjadwalan kunjungan.",
                  "For rental plans, villa information, and arranging a visit.",
                ),
              )}
              <div className="contact-grid">
                <a
                  href="https://wa.me/6285965932071"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ArrowUpRight />
                  <span>WHATSAPP</span>
                  <h3>+62 859-6593-2071</h3>
                  <p>{t("Hubungi admin", "Talk to our team")}</p>
                </a>
                <a
                  href="https://www.instagram.com/kamaniyaloka.villa/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram />
                  <span>INSTAGRAM</span>
                  <h3>@kamaniyaloka.villa</h3>
                  <p>{t("Ikuti kabar kami", "Follow our updates")}</p>
                </a>
                <div>
                  <MapPin />
                  <span>{t("ALAMAT", "ADDRESS")}</span>
                  <p>{address}</p>
                </div>
              </div>
            </section>
          )}
        </main>
        <section className="closing">
          <span className="eyebrow">YOUR NEXT CHAPTER, IN BALI</span>
          <h2>
            {t(
              "Bayangkan keseharian Anda di sini.",
              "Imagine your everyday here.",
            )}
          </h2>
          {cta()}
        </section>
        <footer>
          <div className="footer-top">
            <div>
              <Link className="footer-brand" href={href()}>
                KAMANIYALOKA
              </Link>
              <p>PRIVATE VILLAS · BALI</p>
            </div>
            <p>{address}</p>
            <div>
              <a href="https://www.instagram.com/kamaniyaloka.villa/">
                Instagram ↗
              </a>
              <a href="https://wa.me/6285965932071">WhatsApp ↗</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Kamaniyaloka</span>
            <span>
              {t(
                "Inquiry langsung. Konfirmasi personal.",
                "Direct inquiries. Personal confirmation.",
              )}
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
function InquiryForm({ lang }: { lang: Lang }) {
  const t = (id: string, en: string) => pick(lang, id, en);
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [villa, setVilla] = useState("a");
  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get("villa");
    if (v && ["a", "b", "c"].includes(v)) setVilla(v);
  }, []);
  const labels: Record<string, string> = {
    name: t("Nama lengkap", "Full name"),
    phone: t(
      "Nomor WhatsApp (internasional)",
      "WhatsApp number (international)",
    ),
    email: t("Email (opsional)", "Email (optional)"),
    villa: t("Pilihan villa", "Choose a villa"),
    date: t("Tanggal mulai sewa", "Rental start date"),
    duration: t("Durasi sewa", "Rental duration"),
    guests: t("Jumlah penghuni", "Number of residents"),
    message: t("Pesan tambahan (opsional)", "Additional message (optional)"),
    consent: t("Persetujuan privasi", "Privacy consent"),
  };
  const messages: Record<string, string> = {
    name: t("Isi nama 2–100 karakter.", "Enter a name of 2–100 characters."),
    phone: t(
      "Gunakan format internasional, misalnya +628123456789.",
      "Use international format, e.g. +628123456789.",
    ),
    email: t("Masukkan email yang valid.", "Enter a valid email."),
    villa: t("Pilih villa.", "Choose a villa."),
    date: t(
      "Pilih tanggal hari ini atau setelahnya (waktu Bali).",
      "Choose today or later (Bali time).",
    ),
    duration: t("Pilih durasi.", "Choose a duration."),
    guests: t(
      "Kapasitas A/B: 1–4; C: 1–6 orang.",
      "Capacity A/B: 1–4; C: 1–6 residents.",
    ),
    message: t("Maksimal 1.500 karakter.", "Maximum 1,500 characters."),
    consent: t(
      "Persetujuan diperlukan untuk melanjutkan.",
      "Consent is required to continue.",
    ),
  };
  function field(key: string, element: React.ReactNode) {
    return (
      <div className={"field " + (key === "message" ? "full" : "")}>
        <label htmlFor={key}>
          {labels[key]}
          {!["email", "message"].includes(key) && " *"}
        </label>
        {element}
        {errors.includes(key) && (
          <span className="error" id={key + "-error"}>
            {messages[key]}
          </span>
        )}
      </div>
    );
  }
  const props = (key: string) => ({
    id: key,
    name: key,
    "aria-invalid": errors.includes(key),
    "aria-describedby": errors.includes(key) ? key + "-error" : undefined,
  });
  return (
    <form
      noValidate
      onChange={() => {
        setResult("");
        setCopied(false);
      }}
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const d = Object.fromEntries(f.entries()) as unknown as Inquiry;
        d.consent = f.get("consent") === "on";
        const errs = validate(d);
        setErrors(errs);
        if (errs.length) {
          document.getElementById(errs[0])?.focus();
          return;
        }
        setResult(summary(d, lang));
      }}
    >
      <div className="form-grid">
        {field(
          "name",
          <input
            {...props("name")}
            autoComplete="name"
            required
            maxLength={100}
          />,
        )}
        {field(
          "phone",
          <input
            {...props("phone")}
            type="tel"
            autoComplete="tel"
            placeholder="+62"
            required
          />,
        )}
        {field(
          "email",
          <input {...props("email")} type="email" autoComplete="email" />,
        )}
        {field(
          "villa",
          <select
            {...props("villa")}
            value={villa}
            onChange={(e) => setVilla(e.target.value)}
          >
            {villas.map((v) => (
              <option value={v.id} key={v.id}>
                Villa {v.id.toUpperCase()} · {v.beds} {t("kamar", "bedrooms")}
              </option>
            ))}
          </select>,
        )}
        {field(
          "date",
          <input {...props("date")} type="date" min={today()} required />,
        )}
        {field(
          "duration",
          <select {...props("duration")} defaultValue="monthly">
            <option value="monthly">{t("Bulanan", "Monthly")}</option>
            <option value="yearly">{t("Tahunan", "Yearly")}</option>
            <option value="flexible">
              {t("Fleksibel / diskusikan", "Flexible / discuss")}
            </option>
          </select>,
        )}
        {field(
          "guests",
          <input
            {...props("guests")}
            type="number"
            min={1}
            max={villa === "c" ? 6 : 4}
            defaultValue={1}
            required
          />,
        )}
        {field(
          "message",
          <textarea {...props("message")} rows={4} maxLength={1500} />,
        )}
      </div>
      <label className="consent">
        <input {...props("consent")} type="checkbox" required />
        <span>
          {t(
            "Saya setuju membagikan data di formulir ini kepada admin melalui WhatsApp untuk menanggapi inquiry. Data tidak disimpan ke database website. WhatsApp memproses data sesuai kebijakan privasinya.",
            "I agree to share these details with the team via WhatsApp to respond to my inquiry. Data is not stored in a website database. WhatsApp processes data under its own privacy policy.",
          )}
        </span>
      </label>
      {errors.includes("consent") && (
        <p className="error" id="consent-error">
          {messages.consent}
        </p>
      )}
      <button className="button" type="submit">
        {t("Siapkan inquiry", "Prepare inquiry")}
        <ArrowRight size={17} />
      </button>
      {result && (
        <div className="summary" aria-live="polite">
          <h3>{t("Ringkasan inquiry Anda", "Your inquiry summary")}</h3>
          <pre>{result}</pre>
          <p>
            {t(
              "Belum terkirim. Buka WhatsApp, lalu tekan Kirim untuk menghubungi admin.",
              "Not sent yet. Open WhatsApp, then press Send to contact our team.",
            )}
          </p>
          <a
            className="button"
            target="_blank"
            rel="noopener noreferrer"
            href={whatsapp(result)}
          >
            {t("Buka WhatsApp", "Open WhatsApp")}
            <ArrowUpRight size={17} />
          </a>
          <button
            type="button"
            className="copy"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(result);
                setCopied(true);
              } catch {
                setCopied(false);
              }
            }}
          >
            {copied
              ? t("Tersalin", "Copied")
              : t("Salin ringkasan", "Copy summary")}
          </button>
          <small>
            {t(
              "Jika tombol salin tidak tersedia, pilih dan salin teks ringkasan di atas.",
              "If copying is unavailable, select and copy the summary text above.",
            )}
          </small>
        </div>
      )}
    </form>
  );
}
