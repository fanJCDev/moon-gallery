"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ZoomableImage({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  // ESC برای بستن + قفل اسکرولِ بدنه وقتی Lightbox بازه
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setZoomed(false);
  };

  return (
    <>
      {/* تصویر اصلی — کلیک = بزرگ‌نمایی */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-lg bg-neutral-900"
        aria-label={`View ${alt} fullscreen`}
      >
        <div className="relative aspect-[4/5]">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
        <span className="absolute bottom-3 right-3 rounded-full bg-neutral-950/70 px-3 py-1 text-xs text-neutral-200 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
          🔍 View details
        </span>
      </button>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black/90 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute right-5 top-4 z-10 text-4xl leading-none text-neutral-300 hover:text-white"
            onClick={close}
            aria-label="Close"
          >
            ×
          </button>

          {/* کلیک روی تصویر = زوم ۱.۸x */}
          <div
            className={`relative h-full w-full transition-transform duration-300 ${
              zoomed ? "cursor-zoom-out scale-[1.8]" : "cursor-zoom-in"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setZoomed(!zoomed);
            }}
          >
            <Image src={src} alt={alt} fill className="object-contain" sizes="100vw" />
          </div>

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-neutral-400">
            Click: zoom · Esc: close
          </p>
        </div>
      )}
    </>
  );
}