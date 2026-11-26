'use client';
import { useState, use } from "react";
import Link from "next/link";
import ArtworkCard from "@/components/ArtworkCard";
import { artworks, categories } from "@/lib/artworks";

export default function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  // ۱. باز کردن پارامترهای فیلتر دسته‌بندی
  const resolvedParams = use(searchParams);
  const category = resolvedParams.category;
  const active = category ?? "all";
  const list = active === "all" ? artworks : artworks.filter((a) => a.category === active);

  // ۲. استیت برای مدیریت اثر انتخاب شده جهت زوم (Modal)
  const [selectedArtwork, setSelectedArtwork] = useState<typeof artworks[0] | null>(null);

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16">
      <h1 className="font-display text-3xl md:text-4xl">Gallery</h1>
      <p className="mt-2 text-sm text-neutral-400">{list.length} works</p>

      {/* بخش دکمه‌های دسته‌بندی */}
      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <Link
            key={c.id}
            href={c.id === "all" ? "/gallery" : `/gallery?category=${c.id}`}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              active === c.id
                ? "border-amber-200 bg-amber-200 text-neutral-950"
                : "border-neutral-700 text-neutral-300 hover:border-amber-200 hover:text-amber-200"
            }`}
          >
            {c.label}
          </Link>
        ))}
      </div>

      {/* چیدمان ۴ تایی کنار هم با استایل مستقیم شما */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '16px', marginTop: '40px' }}>
        {list.map((a) => (
          <div 
            key={a.slug} 
            onClick={() => setSelectedArtwork(a)} // با کلیک روی هر کارت، اثر انتخاب می‌شود
            className="cursor-pointer"
          >
            <ArtworkCard artwork={a} />
          </div>
        ))}
      </div>

      {/* ۳. لایه پاپ‌آپ (Modal) برای زوم کامل تصویر */}
      {selectedArtwork && (
        <div 
          onClick={() => setSelectedArtwork(null)} // با کلیک روی فضای خالی یا عکس، زوم بسته شده و به لیست برمی‌گردد
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4 cursor-zoom-out animate-fade-in"
        >
          {/* دکمه ضربدر برای خروج */}
          <button 
            onClick={() => setSelectedArtwork(null)}
            className="absolute top-6 right-6 text-zinc-400 hover:text-white text-3xl font-light"
          >
            ✕
          </button>

          <div className="max-w-4xl w-full text-center" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl text-amber-200 mb-4 font-medium">
              {selectedArtwork.title}
            </h2>
            <div className="relative max-h-[80vh] overflow-hidden rounded-lg border border-neutral-800 shadow-2xl">
              <img
                src={selectedArtwork.image || `/artwork/${selectedArtwork.slug}.jpg`}
                alt={selectedArtwork.title}
                style={{ maxWidth: '100%', maxHeight: '75vh', objectFit: 'contain', margin: '0 auto' }}
              />
            </div>
            <p className="mt-4 text-xs text-zinc-500 uppercase tracking-widest">
              {selectedArtwork.category} — برای بازگشت کلیک کنید
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
