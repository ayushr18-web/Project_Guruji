export interface IStoryItem {
  title: string;
  description: string;
  language: string;
  tags: string[];
  cover_image_url: string;
  thumbnail_url: string;
  id: string;
  slug: string;
  content_type: "ARTICLE" | string;
  sub_type: "STORY" | string;
  author_id: string;
  author_name: string;
  category_id: string | null;
  status: "PUBLISHED" | "DRAFT" | string;
  published_at: string | null;
  featured: boolean;
  premium_content: string;
  created_at: string;
  updated_at: string;
}

export interface IStoryApiResponse {
  total_count: number;
  limit: number;
  skip: number;
  next_page: string | null;
  prev_page: string | null;
  items: IStoryItem[];
}
