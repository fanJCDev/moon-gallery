import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { artworks, getArtworkBySlug } from "@/lib/artworks";
import ArtworkCard from "@/components/ArtworkCard";
import BuyButton from "@/components/BuyButton";
import ZoomableImage from "@/components/ZoomableImage";

// همه‌ی صفحات تابلوها رو موقع build بسازه (سرعت + SEO)
export function generateStaticParams() {
  return artworks.map((a) => ({ slug: a.slug }));
}

// عنوان و og:image مخصوص هر تابلو — برای اشتراک‌گذاری تو اینستاگرام طلاست ✨
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artwork = getArtworkBySlug(slug);
  if (!artwork) return { title: "Not found — Moon Gallery" };
  return {
    title: `${artwork.title} — Moon Gallery`,
    description: artwork.description,
    openGraph: {
      title: `${artwork.title} — Moon Gallery`,
      description: artwork.description,
      images: [{ url: artwork.image }],
    },
  };
}

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artwork = getArtworkBySlug(slug);
  if (!artwork) notFound();

  const categoryLabel = artwork.category[0].toUpperCase() + artwork.category.slice(1);
const others = artworks.filter((a) => a.slug !== artwork.slug);
const related = [
  ...others.filter((a) => a.category === artwork.category),
  ...others.filter((a) => a.category !== artwork.category),
].slice(0, 3);

  // داده‌ی ساختاریافته برای گوگل (Schema.org) — تابلوها تو نتایج جستجو غنی نمایش داده می‌شن
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: artwork.title,
    description: artwork.description,
    image: artwork.image,
    artMedium: artwork.technique,
    artform: "Painting",
    creator: { "@type": "Person", name: "Your Name" }, // 👈 اسمت رو بذار
    offers: {
      "@type": "Offer",
      price: artwork.price,
      priceCurrency: "CAD",
      availability: artwork.sold ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <Link href="/gallery" className="text-sm text-neutral-400 hover:text-amber-200">
          ← Back to Gallery
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* تصویر — تو دسکتاپ موقع اسکرول ثابت می‌مونه */}
          <div className="self-start lg:sticky lg:top-24">
            <ZoomableImage src={artwork.image} alt={artwork.title} priority />
          </div>

          {/* جزئیات */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-200">
              {categoryLabel}
            </p>
            <h1 className="font-display mt-2 text-3xl md:text-5xl">{artwork.title}</h1>
            <p className="mt-5 leading-8 text-neutral-300">{artwork.description}</p>

            <dl className="mt-8 space-y-3 border-t border-neutral-800/60 pt-6 text-sm">
              <div className="flex justify-between">
                <dt className="text-neutral-400">Technique</dt>
                <dd>{artwork.technique}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-neutral-400">Dimensions</dt>
                <dd>{artwork.width} × {artwork.height} cm</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-neutral-400">Year</dt>
                <dd>{artwork.year}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-neutral-400">Edition</dt>
                <dd>Unique (1 of 1)</dd>
              </div>
            </dl>

            <div className="mt-8 space-y-3">
              <BuyButton title={artwork.title} price={artwork.price} sold={artwork.sold} />
              <Link
                href="/contact"
                className="block text-center text-xs text-neutral-400 hover:text-amber-200"
              >
                Questions about this piece? Ask me →
              </Link>
            </div>

            {/* نشانه‌های اعتماد — نرخ تبدیل خرید رو بالا می‌بره */}
            <ul className="mt-8 space-y-2 border-t border-neutral-800/60 pt-6 text-xs text-neutral-400">
              <li>🚚 Free insured shipping across Canada</li>
              <li>📜 Certificate of authenticity included</li>
              <li>🔄 14-day return — no questions asked</li>
            </ul>
          </div>
        </div>
      </div>

      {/* آثار مشابه */}
      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-24">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-2xl">More {categoryLabel} Works</h2>
            <Link
              href={`/gallery?category=${artwork.category}`}
              className="text-sm text-neutral-400 hover:text-amber-200"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => <ArtworkCard key={a.slug} artwork={a} />)}
          </div>
        </section>
      )}
    </>
  );
}