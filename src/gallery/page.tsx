import Link from "next/link";
import ArtworkCard from "@/components/ArtworkCard";
import { artworks, categories } from "@/lib/artworks";

export const metadata = { title: "Gallery — Moon Gallery" };

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = category ?? "all";
  const list = active === "all" ? artworks : artworks.filter((a) => a.category === active);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="font-display text-3xl md:text-4xl">Gallery</h1>
      <p className="mt-2 text-sm text-neutral-400">{list.length} works</p>

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

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((a) => <ArtworkCard key={a.slug} artwork={a} />)}
      </div>
    </section>
  );
}