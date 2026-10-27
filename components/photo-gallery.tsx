"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { photos } from "@/lib/media";
import { type Lang, pick } from "@/lib/content";
export default function PhotoGallery({
  lang,
  filter,
}: {
  lang: Lang;
  filter: string;
}) {
  const [category, setCategory] = useState("all");
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const list = photos.filter(
    (p) =>
      (filter === "all" || p.villa === filter) &&
      (category === "all" || p.category === category),
  );
  useEffect(() => {
    setActive(null);
  }, [filter, category]);
  useEffect(() => {
    if (active !== null) dialog.current?.showModal();
    else dialog.current?.close();
  }, [active]);
  if (!photos.length) return null;
  const step = (n: number) =>
    setActive((i) => (i === null ? null : (i + n + list.length) % list.length));
  return (
    <>
      <div
        className="filters"
        aria-label={pick(lang, "Kategori foto", "Photo categories")}
      >
        {["all", "bedroom", "pool", "living", "exterior"].map((c, i) => (
          <button
            key={c}
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            {
              (lang === "id"
                ? [
                    "Semua foto",
                    "Kamar tidur",
                    "Kolam",
                    "Ruang keluarga",
                    "Eksterior",
                  ]
                : [
                    "All photos",
                    "Bedrooms",
                    "Pool",
                    "Living spaces",
                    "Exterior",
                  ])[i]
            }
          </button>
        ))}
      </div>
      <div className="villa-grid">
        {list.map((p, i) => (
          <button className="photo" key={p.src} onClick={() => setActive(i)}>
            <Image
              src={p.src}
              alt={p.alt[lang]}
              width={p.width}
              height={p.height}
              sizes="(max-width: 600px) 90vw, 30vw"
            />
          </button>
        ))}
      </div>
      {!list.length && (
        <p>
          {pick(
            lang,
            "Belum ada foto untuk pilihan ini.",
            "No photos for this selection yet.",
          )}
        </p>
      )}
      <dialog
        ref={dialog}
        className="lightbox"
        onClose={() => setActive(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
      >
        <button
          className="close-photo"
          aria-label={pick(lang, "Tutup", "Close")}
          onClick={() => setActive(null)}
        >
          <X />
        </button>
        {active !== null && list[active] && (
          <>
            <Image
              src={list[active].src}
              alt={list[active].alt[lang]}
              width={list[active].width}
              height={list[active].height}
            />
            <p>{list[active].alt[lang]}</p>
            <div className="photo-controls">
              <button
                aria-label={pick(lang, "Foto sebelumnya", "Previous photo")}
                onClick={() => step(-1)}
              >
                <ChevronLeft />
              </button>
              <span>
                {active + 1} / {list.length}
              </span>
              <button
                aria-label={pick(lang, "Foto berikutnya", "Next photo")}
                onClick={() => step(1)}
              >
                <ChevronRight />
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
