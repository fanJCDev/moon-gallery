import Image from "next/image";
import Link from "next/link";
import type { Artwork } from "@/types/artwork";

export default function ArtworkCard({ artwork }: { artwork: Artwork }) {
  return (
    <Link href={`/artwork/${artwork.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-neutral-900">
        <Image
          src={artwork.image}
          alt={artwork.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {artwork.sold && (
          <span className="absolute right-3 top-3 rounded-full bg-neutral-950/80 px-3 py-1 text-xs tracking-widest text-amber-200">
            SOLD
          </span>
        )}
      </div>
      <div className="mt-3">
        <h3 className="font-display text-lg">{artwork.title}</h3>
        <p className="text-sm text-neutral-400">
          {artwork.technique} · {artwork.width}×{artwork.height} cm
        </p>
        <p className="mt-1 text-sm text-amber-200">
          {artwork.sold ? "Private collection" : `$${artwork.price.toLocaleString("en-CA")} CAD`}
        </p>
      </div>
    </Link>
  );
}