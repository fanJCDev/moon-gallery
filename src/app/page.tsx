import Link from "next/link";
import ArtworkCard from "@/components/ArtworkCard";
import { getFeatured } from "@/lib/artworks";

export default function HomePage() {
  return (
    <>
      {/* هیرو */}
      <section className="mx-auto flex max-w-6xl flex-col items-center px-4 pb-20 pt-24 text-center md:pt-32">
        <p className="text-xs uppercase tracking-[0.35em] text-amber-200">Original Paintings</p>
        <h1 className="font-display mt-4 max-w-3xl text-4xl leading-tight md:text-6xl">
          Where colour learns to <span className="italic text-amber-200">breathe</span>
        </h1>
        <p className="mt-6 max-w-xl text-neutral-400">
          One-of-a-kind works in modern, classical and miniature styles.
        </p>
        <Link
          href="/gallery"
          className="mt-8 rounded-full border border-amber-200 px-8 py-3 text-sm text-amber-200 transition-colors hover:bg-amber-200 hover:text-neutral-950"
        >
          Explore the Gallery
        </Link>
      </section>

      {/* آثار برگزیده */}
      <section className="mx-auto max-w-6xl px-4 pb-24">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl md:text-3xl">Featured Works</h2>
          <Link href="/gallery" className="text-sm text-neutral-400 hover:text-amber-200">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {getFeatured().map((a) => <ArtworkCard key={a.slug} artwork={a} />)}
        </div>
      </section>
    </>
  );
}