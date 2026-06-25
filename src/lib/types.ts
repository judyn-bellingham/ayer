export type Category = 'cultural' | 'dining' | 'adventure' | 'nature' | 'crafts' | 'heritage';

export interface Experience {
  id: string;
  name: string;
  category: Category;
  description: string;
  short_desc: string;
  price: number;
  duration_minutes: number;
  rating: number;
  review_count: number;
  image_url: string;
  location_label: string;
  latitude: number | null;
  longitude: number | null;
  featured: boolean;
  popular: boolean;
  tags: string[];
  created_at: string;
}

export interface Route {
  id: string;
  user_id: string;
  name: string;
  experience_ids: string[];
  total_price: number;
  total_duration_minutes: number;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  home_country: string | null;
  travel_style: string | null;
  created_at: string;
}

export type TabId = 'home' | 'explore' | 'route' | 'profile';

export const CATEGORY_META: Record<Category, { label: string; icon: string }> = {
  cultural: { label: 'Cultural', icon: 'Landmark' },
  dining: { label: 'Dining', icon: 'UtensilsCrossed' },
  adventure: { label: 'Adventure', icon: 'Compass' },
  nature: { label: 'Nature', icon: 'Leaf' },
  crafts: { label: 'Crafts', icon: 'Scissors' },
  heritage: { label: 'Heritage', icon: 'Building2' },
};

export const CATEGORIES = Object.keys(CATEGORY_META) as Category[];

export type CheckpointCategory =
  | 'sunset'
  | 'monkey'
  | 'restaurant'
  | 'photo'
  | 'mosque'
  | 'mangrove';

export interface Checkpoint {
  id: string;
  name: string;
  category: CheckpointCategory;
  description: string;
  best_time: string;
  rating: number;
  review_count: number;
  image_url: string;
  x: number;
  y: number;
}

export const CHECKPOINT_META: Record<
  CheckpointCategory,
  { label: string; color: string; icon: string }
> = {
  sunset: { label: 'Sunset Spot', color: '#f59e0b', icon: 'Sunset' },
  monkey: { label: 'Monkey Observation Point', color: '#84cc16', icon: 'Eye' },
  restaurant: { label: 'Floating Restaurant', color: '#ef4444', icon: 'UtensilsCrossed' },
  photo: { label: 'Photography Deck', color: '#3b82f6', icon: 'Camera' },
  mosque: { label: 'Mosque Viewpoint', color: '#22d3ee', icon: 'Building2' },
  mangrove: { label: 'Mangrove Tunnel', color: '#10b981', icon: 'Trees' },
};
