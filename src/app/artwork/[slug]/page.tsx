'use client';
import { use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { artworks } from '../../../lib/artworks';

export default function ArtworkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  
  // ۱. باز کردن پارامتر آدرس بار
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;

  // ۲. پیدا کردن اثر هنری از فایل دیتای شما
  const currentArtwork = artworks.find((a) => a.slug === slug);
  const imageSrc = currentArtwork?.image || `/artwork/${slug}.jpg`; 

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#fafafa] flex flex-col items-center justify-center p-6 relative">
      
      {/* دکمه ناوبری بازگشت به گالری */}
      <div className="absolute top-6 left-6 z-10">
        <Link href="/gallery" className="bg-neutral-900 border border-neutral-800 text-zinc-300 px-4 py-2 rounded-md hover:text-amber-200 transition">
          ← بازگشت به گالری
        </Link>
      </div>

      <div className="max-w-3xl w-full text-center mt-12">
        <h1 className="text-2xl text-amber-200 mb-6 uppercase tracking-wider font-bold">
          {currentArtwork?.title || slug.replace('-', ' ')}
        </h1>
        
        {/* 
          ۳. اضافه کردن رفتار بازگشت فوری:
          با کلیک روی عکس بزرگ، کاربر مستقیماً به صفحه گالری بازمی‌گردد
        */}
        <div 
          onClick={() => router.push('/gallery')}
          className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-neutral-800 shadow-2xl bg-black/50 cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
        >
          <img
            src={imageSrc}
            alt={currentArtwork?.title || "Artwork"}
            className="w-full h-full object-contain"
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 text-amber-200 text-xs px-4 py-2 rounded-full border border-neutral-800 backdrop-blur-sm">
            برای بازگشت به لیست گالری، روی عکس کلیک کنید
          </div>
        </div>
      </div>
    </div>
  );
}
