export interface ITeachings {
  title: string;
  description: string;
  language: string;
  tags: string[];
  cover_image_url: string;
  thumbnail_url: string;
  id: string;
  slug: string;
  content_type: string;
  file_url: string;
  duration: number;
  author_id: string;
  author_name: string;
  category_id: string;
  status: string;
  published_at: string; // ISO 8601 date string
  featured: boolean;
  premium_content: boolean;
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
};

export interface ITeachingsApiResponse {
  total_count: number;
  limit: number;
  skip: number;
  next_page: string;
  prev_page: string;
  items: ITeachings[];
};
