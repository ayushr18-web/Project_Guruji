export interface IBook {
  id: string;
  title: string;
  slug: string;
  description: string;
  author_name: string;
  cover_image_url: string;
  thumbnail_url: string;
  file_url: string;
  language: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'; // extend if more statuses exist
  tags: string[];
  featured: boolean;
  premium_content: boolean;
  category_id: string | null;
  average_rating: number | null;
  bookmark_count: number;
  like_count: number;
  review_count: number;
  page_count: number | null;
  view_count: number;
  created_at: string; // ISO string; you can use `Date` if parsing to date object
  updated_at: string;
  published_at: string | null;
}
