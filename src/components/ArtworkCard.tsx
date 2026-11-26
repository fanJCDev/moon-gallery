import Link from "next/link";

interface Artwork {
  slug: string;
  title: string;
  category: string;
  image?: string;
}

export default function ArtworkCard({ artwork }: { artwork: Artwork }) {
  const currentImage = artwork.image || `/artwork/${artwork.slug}.jpg`;

  return (
    <Link href={`/artwork/${artwork.slug}`} className="group block w-full">
      {/* کادر عکس با نسبت ۳ به ۲ متناسب و جمع‌وجور */}
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 transition-all duration-300 group-hover:border-amber-200/50 shadow-lg">
        <img
          src={currentImage}
          alt={artwork.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-3 flex justify-between items-center px-1">
        <h3 className="text-base font-medium text-neutral-200 group-hover:text-amber-200 transition">
          {artwork.title}
        </h3>
        <span className="text-xs uppercase text-neutral-500">{artwork.category}</span>
      </div>
    </Link>
  );
}
