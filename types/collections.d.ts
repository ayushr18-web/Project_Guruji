// Root structure
export interface ICollectionListResponse {
  total_count: number;
  limit: number;
  skip: number;
  next_page: string | null;
  prev_page: string | null;
  items: Collection[];
}

// Collection structure
export interface ICollection {
  name: string;
  description: string;
  cover_image_url: string;
  is_public: boolean;
  is_featured: boolean;
  tags: string[];
  id: string;
  slug: string;
  curator_id: string | null;
  created_at: string;
  updated_at: string;
  items: ICollectionItem[];
}

// CollectionItem structure
export interface ICollectionItem {
  sort_order: number;
  notes: string;
  id: string;
  collection_id: string;
  content_id: string;
  added_at: string;
  content: IContent;
}

// Content structure
export interface IContent {
  id: string;
  title: string;
  slug: string;
  description: string;
  cover_image_url: string;
  content_type: 'ARTICLE' | 'VIDEO' | 'AUDIO';
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED'; 
  created_at: string;
  updated_at: string;
}


export type TContentItem = {
  content_type: "ARTICLE" | string; // or restrict further if more types exist
  cover_image_url: string;
  created_at: string; // You can use `Date` if parsed
  description: string;
  id: string;
  slug: string;
  status: "PUBLISHED" | "DRAFT" | string; // Add other possible statuses if needed
  title: string;
  updated_at: string; // You can use `Date` if parsed
};