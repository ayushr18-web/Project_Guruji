export interface IFestivalResponse {
  total_count: number;
  limit: number;
  skip: number;
  next_page: string;
  prev_page: string;
  items: IFestival[];
}

export interface IFestival {
  name: string;
  alternate_names: IAlternateNames;
  description: string;
  significance: string;
  rituals_and_observances: string;
  deities_associated: string[];
  start_date: string; // ISO Date String
  end_date: string;   // ISO Date String
  duration_days: number;
  primary_tithi: string;
  primary_nakshatra: string;
  hindu_month: string;
  paksha: string;
  state_id: string;
  images: string[];
  is_major_festival: boolean;
  is_active: boolean;
  id: string;
  created_at: string;
  updated_at: string;
  created_by_id: string;
}

export interface IAlternateNames {
  [key: string]: string;
}
