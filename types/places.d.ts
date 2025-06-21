// Define a single place item
export interface IPlace {
  country_id: string;
  region_id: string;
  state_id: string;
  city_id: string;
  place_description: string;
  category_id: string;
  is_featured: boolean;
  religious_importance: string;
  historical_background: string;
  location_description: string;
  latitude: number;
  longitude: number;
  cover_image: string;
  gallery_images: string[];
  is_active: boolean;
  id: string;
  name: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  created_by: string;
}

// Define the response structure containing an array of places
export interface IPlacesResponse {
  total_count: number;
  limit: number;
  skip: number;
  next_page: string;
  prev_page: string;
  items: IPlace[];
}
