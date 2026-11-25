export type Category = "modern" | "classic" | "miniature";

export interface Artwork {
  slug: string;
  title: string;
  titleFa?: string;
  category: Category;
  image: string;
  width: number;
  height: number;
  technique: string;
  year: number;
  price: number;
  featured?: boolean;
  sold?: boolean;
  description: string;
}
