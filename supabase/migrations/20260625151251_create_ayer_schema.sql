-- Ayer: Kampong Ayer tourism app schema

-- Experiences: river tours, cultural sites, water villages, dining
CREATE TABLE IF NOT EXISTS experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('cultural', 'dining', 'adventure', 'nature', 'crafts', 'heritage')),
  description text NOT NULL,
  short_desc text NOT NULL,
  price decimal(10,2) NOT NULL DEFAULT 0,
  duration_minutes int NOT NULL DEFAULT 60,
  rating numeric(2,1) NOT NULL DEFAULT 4.5,
  review_count int NOT NULL DEFAULT 0,
  image_url text NOT NULL,
  location_label text NOT NULL,
  latitude numeric(9,6),
  longitude numeric(9,6),
  featured boolean NOT NULL DEFAULT false,
  popular boolean NOT NULL DEFAULT false,
  tags text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Saved routes (custom itineraries built by users)
CREATE TABLE IF NOT EXISTS routes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  experience_ids uuid[] NOT NULL DEFAULT '{}',
  total_price decimal(10,2) NOT NULL DEFAULT 0,
  total_duration_minutes int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- User profiles
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  home_country text,
  travel_style text DEFAULT 'explorer',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Favorites (bookmark experiences)
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  experience_id uuid NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, experience_id)
);

-- Enable RLS
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Experiences: public read, no write (managed via seed)
CREATE POLICY "experiences_public_read" ON experiences FOR SELECT
  TO anon, authenticated USING (true);

-- Routes: owner only
CREATE POLICY "routes_owner_select" ON routes FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "routes_owner_insert" ON routes FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "routes_owner_update" ON routes FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "routes_owner_delete" ON routes FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Profiles: owner only
CREATE POLICY "profiles_owner_select" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);
CREATE POLICY "profiles_owner_insert" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_owner_update" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Favorites: owner only
CREATE POLICY "favorites_owner_select" ON favorites FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "favorites_owner_insert" ON favorites FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "favorites_owner_delete" ON favorites FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_experiences_category ON experiences(category);
CREATE INDEX idx_experiences_featured ON experiences(featured) WHERE featured = true;
CREATE INDEX idx_routes_user ON routes(user_id);
CREATE INDEX idx_favorites_user ON favorites(user_id);
