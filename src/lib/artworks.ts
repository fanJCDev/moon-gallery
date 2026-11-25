import type { Artwork, Category } from "@/types/artwork";

export const categories: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All Works" },
  { id: "modern", label: "Modern" },
  { id: "classic", label: "Classic" },
  { id: "miniature", label: "Miniature" },
];

export const artworks: Artwork[] = [
  {
    slug: "whisper-of-dawn",
    title: "Whisper of Dawn",
    category: "modern",
    image: "https://picsum.photos/seed/moon-dawn/1200/1500",
    width: 60, height: 75,
    technique: "Acrylic on canvas",
    year: 2024, price: 850, featured: true,
    description: "A quiet conversation between light and silence.",
  },
  {
    slug: "persian-garden",
    title: "Persian Garden",
    category: "miniature",
    image: "https://picsum.photos/seed/moon-garden/1200/1500",
    width: 30, height: 40,
    technique: "Gouache on paper",
    year: 2023, price: 450, featured: true,
    description: "Inspired by classical Persian miniature gardens.",
  },
  {
    slug: "old-street",
    title: "The Old Street",
    category: "classic",
    image: "https://picsum.photos/seed/moon-street/1200/1500",
    width: 80, height: 60,
    technique: "Oil on canvas",
    year: 2023, price: 1200, sold: true,
    description: "Memory of an alley where time moved slower.",
  },
  {
    slug: "blue-melody",
    title: "Blue Melody",
    category: "modern",
    image: "https://picsum.photos/seed/moon-blue/1200/1500",
    width: 100, height: 100,
    technique: "Mixed media on canvas",
    year: 2025, price: 1400, featured: true,
    description: "Built around a single note of ultramarine.",
  },
  // 👈 تابلوهای خودت رو اینجا اضافه کن
];

export const getFeatured = () => artworks.filter((a) => a.featured);
export const getArtworkBySlug = (slug: string) => artworks.find((a) => a.slug === slug);