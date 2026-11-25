"use client";

import { useState } from "react";

export default function BuyButton({
  title,
  price,
  sold,
}: {
  title: string;
  price: number;
  sold?: boolean;
}) {
  const [loading, setLoading] = useState(false);

  // تابلو فروخته‌شده → به‌جای دکمه، برچسب نمایش بده
  if (sold) {
    return (
      <div className="w-full rounded-full border border-neutral-700 px-8 py-4 text-center text-sm tracking-[0.2em] text-neutral-400">
        SOLD — PRIVATE COLLECTION
      </div>
    );
  }

  const handleBuy = async () => {
    setLoading(true);
    // 🔒 فاز ۳: اینجا به /api/checkout وصل می‌شه و Stripe باز می‌شه
    alert(`Stripe comes in Phase 3! 🎨\n${title} — $${price.toLocaleString("en-CA")} CAD`);
    setLoading(false);
  };

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      className="w-full rounded-full bg-amber-200 px-8 py-4 font-medium text-neutral-950 transition-all hover:bg-amber-100 hover:shadow-[0_0_25px_rgba(253,230,138,0.25)] disabled:opacity-60"
    >
      {loading ? "Processing…" : `Buy Now — $${price.toLocaleString("en-CA")} CAD`}
    </button>
  );
}