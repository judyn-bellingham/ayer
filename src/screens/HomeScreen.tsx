import { Search, Star, TrendingUp, Sparkles, ArrowRight, Flame } from 'lucide-react';
import type { Experience, Category, TabId } from '../lib/types';
import { CATEGORY_META, CATEGORIES } from '../lib/types';
import { ExperienceCard } from '../components/ExperienceCard';
import { TrendingRouteCard, type TrendingRoute } from '../components/TrendingRouteCard';

interface HomeScreenProps {
  experiences: Experience[];
  loading: boolean;
  onSelectExperience: (exp: Experience) => void;
  onNavigate: (tab: TabId) => void;
  onCategorySelect: (cat: Category) => void;
}

const CATEGORY_ICONS: Record<Category, string> = {
  cultural: '🏛️',
  dining: '🍽️',
  adventure: '🧭',
  nature: '🌿',
  crafts: '✂️',
  heritage: '🏛️',
};

const TRENDING_ROUTES: TrendingRoute[] = [
  {
    id: 'sunset',
    name: 'Best Sunset Route',
    description: 'Golden hour cruise through the water village to the river estuary',
    image_url:
      'https://images.pexels.com/photos/2406731/pexels-photo-2406731.jpeg?auto=compress&cs=tinysrgb&w=1200',
    rating: 4.9,
    review_count: 412,
    duration_label: '3h 30m',
    price: 85,
    stops: 4,
    tag: 'Most popular',
  },
  {
    id: 'wildlife',
    name: 'Wildlife Discovery Route',
    description: 'Mangrove safari with proboscis monkeys, kingfishers, and silvered leaf monkeys',
    image_url:
      'https://images.pexels.com/photos/158028/bellingham-forest-mangroves-nature-158028.jpeg?auto=compress&cs=tinysrgb&w=1200',
    rating: 4.8,
    review_count: 287,
    duration_label: '4h 00m',
    price: 120,
    stops: 3,
    tag: 'Eco adventure',
  },
  {
    id: 'photography',
    name: 'Photography Trail',
    description: 'Stilt village alleys, golden domes, and misty mangrove backdrops at dawn',
    image_url:
      'https://images.pexels.com/photos/3787839/pexels-photo-3787839.jpeg?auto=compress&cs=tinysrgb&w=1200',
    rating: 4.7,
    review_count: 156,
    duration_label: '2h 45m',
    price: 65,
    stops: 5,
    tag: 'Creator pick',
  },
  {
    id: 'datenight',
    name: 'Date Night Cruise',
    description: 'Private longboat, floating seafood dinner, and lantern-lit river return',
    image_url:
      'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1200',
    rating: 4.9,
    review_count: 198,
    duration_label: '3h 00m',
    price: 150,
    stops: 2,
    tag: 'Couples choice',
  },
];

export function HomeScreen({
  experiences,
  loading,
  onSelectExperience,
  onNavigate,
  onCategorySelect,
}: HomeScreenProps) {
  const featured = experiences.filter((e) => e.featured).slice(0, 5);
  const popular = experiences.filter((e) => e.popular).slice(0, 6);

  return (
    <div className="min-h-screen pb-32">
      {/* Hero */}
      <div className="relative h-[480px] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/3593922/pexels-photo-3593922.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Kampong Ayer"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/50 via-navy-950/40 to-navy-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-navy-950/20 to-transparent" />

        <div className="relative h-full flex flex-col justify-end px-5 pb-8 max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-4 animate-fade-in">
            <Sparkles size={16} className="text-gold-400" />
            <span className="text-xs font-medium tracking-widest uppercase text-gold-300">
              Kampong Ayer · Brunei
            </span>
          </div>
          <h1 className="font-display text-[2.75rem] leading-[1.1] font-bold text-white mb-3 animate-slide-down text-balance">
            Explore Kampong Ayer Your Way
          </h1>
          <p className="text-base text-navy-100/80 mb-6 max-w-sm leading-relaxed animate-slide-down">
            Discover hidden gems, sunset viewpoints, wildlife encounters, and floating
            restaurants.
          </p>

          <button
            onClick={() => onNavigate('explore')}
            className="glass-strong w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left transition-transform active:scale-98 group"
          >
            <Search size={18} className="text-gold-400" />
            <span className="text-sm text-navy-200/70 flex-1">
              Search experiences, tours, dining...
            </span>
            <ArrowRight
              size={16}
              className="text-gold-400 transition-transform group-active:translate-x-1"
            />
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-5">
        {/* Categories */}
        <section className="mt-6">
          <h2 className="font-display text-xl font-semibold text-white mb-3">
            Browse by experience
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategorySelect(cat)}
                className="glass-card flex flex-col items-center justify-center gap-2 p-4 transition-all duration-300 active:scale-95 hover:border-gold-400/30"
              >
                <span className="text-2xl">{CATEGORY_ICONS[cat]}</span>
                <span className="text-xs font-medium text-navy-100/80">
                  {CATEGORY_META[cat].label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Trending Routes */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl glass flex items-center justify-center">
                <Flame size={16} className="text-gold-400" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold text-white">Trending Routes</h2>
                <p className="text-xs text-navy-300/60 mt-0.5">Curated journeys travelers love</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('route')}
              className="text-xs font-medium text-gold-400 flex items-center gap-1 shrink-0"
            >
              See all
              <ArrowRight size={12} />
            </button>
          </div>

          <div className="space-y-4">
            {TRENDING_ROUTES.map((route) => (
              <TrendingRouteCard key={route.id} route={route} />
            ))}
          </div>
        </section>

        {/* Featured */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display text-xl font-semibold text-white">Featured</h2>
              <p className="text-xs text-navy-300/60 mt-0.5">Curated by local experts</p>
            </div>
            <button
              onClick={() => onNavigate('explore')}
              className="text-xs font-medium text-gold-400 flex items-center gap-1"
            >
              See all
              <ArrowRight size={12} />
            </button>
          </div>

          {loading ? (
            <div className="flex gap-4 overflow-hidden">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="shimmer-bg w-72 h-96 rounded-3xl shrink-0 animate-shimmer"
                />
              ))}
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-5 px-5 pb-2">
              {featured.map((exp) => (
                <ExperienceCard
                  key={exp.id}
                  experience={exp}
                  onClick={() => onSelectExperience(exp)}
                  variant="featured"
                />
              ))}
            </div>
          )}
        </section>

        {/* Popular */}
        <section className="mt-10">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-gold-400" />
            <h2 className="font-display text-xl font-semibold text-white">Most loved</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {popular.map((exp) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                onClick={() => onSelectExperience(exp)}
              />
            ))}
          </div>
        </section>

        {/* Stats banner */}
        <section className="mt-10">
          <div className="glass-card p-5 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gold-400/10 blur-2xl" />
            <div className="relative">
              <h3 className="font-display text-lg font-semibold text-white mb-1">
                30,000+ people call this water home
              </h3>
              <p className="text-sm text-navy-200/70 mb-4">
                Kampong Ayer has thrived for over 1,300 years. Experience it through the eyes of
                those who live here.
              </p>
              <div className="flex items-center gap-4">
                <div>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-gold-400 fill-gold-400" />
                    <span className="text-lg font-semibold text-white">4.8</span>
                  </div>
                  <span className="text-xs text-navy-300/60">Avg rating</span>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <span className="text-lg font-semibold text-white">12+</span>
                  <span className="text-xs text-navy-300/60 block">Experiences</span>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <span className="text-lg font-semibold text-white">1.3K</span>
                  <span className="text-xs text-navy-300/60 block">Travelers</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
