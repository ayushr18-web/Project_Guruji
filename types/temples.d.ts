export interface ITemple {
  id: string;
  place_id: string;
  name: string;
  main_deity: string;
  address: string;
  visiting_hours: string;
  description: string;
  history: string;
  architecture: string;
  cover_image: string[];
  is_featured: boolean;
  is_active: boolean;
  visit_count: number;
  created_at: string;
  updated_at: string;
  created_by: string;
  place_name: string;
}

export interface ITempleListResponse {
  total_count: number;
  limit: number;
  skip: number;
  next_page: string | null;
  prev_page: string | null;
  items: ITemple[];
}
