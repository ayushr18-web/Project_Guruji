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
  book_format: 'PDF' | 'TEXT';
}


export interface IChapter {
  book_id: string;
  chapter_number: number;
  id: string;
  title: string;
  description?: string;
  updated_at: string; 
  created_at: string; 
}


export interface IChapterOrBookListResponse {
  total_count: number;
  items: IChapter[] | IBook[];
  skip: number
  limit: number;
  next_page: string | null;
  prev_page: string | null;
} 

export interface ICategory {
  id: string;
  name: string;
  description: string | null;
  icon_url: string | null;
  color_code: string | null;
  parent_id: string | null;
  type: 'BOOK' | string; // Add other types if needed
  is_active: boolean;
  is_featured: boolean;
  created_at: string; // ISO timestamp, consider using Date if parsed
  updated_at: string; // same here
}