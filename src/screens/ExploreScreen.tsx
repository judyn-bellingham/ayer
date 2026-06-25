import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, MapPin, X, List, Map as MapIcon } from 'lucide-react';
import type { Experience, Category, Checkpoint } from '../lib/types';
import { CATEGORY_META, CATEGORIES } from '../lib/types';
import { CHECKPOINTS } from '../lib/checkpoints';
import { ExperienceCard } from '../components/ExperienceCard';
import { RiverMap } from '../components/RiverMap';

interface ExploreScreenProps {
  experiences: Experience[];
  loading: boolean;
  onSelectExperience: (exp: Experience) => void;
  onSelectCheckpoint: (cp: Checkpoint) => void;
  activeCheckpointId: string | null;
  initialCategory: Category | 'all';
}

type SortMode = 'rating' | 'price-low' | 'price-high' | 'duration';
type ViewMode = 'map' | 'list';

export function ExploreScreen({
  experiences,
  loading,
  onSelectExperience,
  onSelectCheckpoint,
  activeCheckpointId,
  initialCategory,
}: ExploreScreenProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>(initialCategory);
  const [showFilters, setShowFilters] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>('rating');
  const [maxPrice, setMaxPrice] = useState(100);
  const [viewMode, setViewMode] = useState<ViewMode>('map');

  const filtered = useMemo(() => {
    let result = experiences;

    if (activeCategory !== 'all') {
      result = result.filter((e) => e.category === activeCategory);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.short_desc.toLowerCase().includes(q) ||
          e.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    result = result.filter((e) => e.price <= maxPrice);

    const sorted = [...result];
    switch (sortMode) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'duration':
        sorted.sort((a, b) => a.duration_minutes - b.duration_minutes);
        break;
      default:
        sorted.sort((a, b) => b.rating - a.rating);
    }

    return sorted;
  }, [experiences, activeCategory, query, maxPrice, sortMode]);

  return (
    <div className="min-h-screen pb-32">
      {/* Search header */}
      <div className="sticky top-0 z-40 glass-strong px-5 pt-6 pb-3">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h1 className="font-display text-2xl font-semibold text-white">Explore</h1>
            {/* Map / List toggle */}
            <div className="glass rounded-full p-1 flex">
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  viewMode === 'map' ? 'gold-gradient text-navy-950' : 'text-navy-100/70'
                }`}
              >
                <MapIcon size={13} />
                Map
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  viewMode === 'list' ? 'gold-gradient text-navy-950' : 'text-navy-100/70'
                }`}
              >
                <List size={13} />
                List
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex-1 glass flex items-center gap-2 px-4 py-3 rounded-2xl">
              <Search size={18} className="text-gold-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search experiences..."
                className="flex-1 bg-transparent text-sm text-white placeholder:text-navy-300/50 outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')}>
                  <X size={16} className="text-navy-300" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`glass w-12 h-12 rounded-2xl flex items-center justify-center transition-all active:scale-90 ${
                showFilters ? 'bg-gold-400/20 border-gold-400/40' : ''
              }`}
            >
              <SlidersHorizontal
                size={18}
                className={showFilters ? 'text-gold-400' : 'text-navy-100'}
              />
            </button>
          </div>

          {/* Category chips */}
          <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar -mx-5 px-5">
            <button
              onClick={() => setActiveCategory('all')}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all active:scale-95 ${
                activeCategory === 'all'
                  ? 'gold-gradient text-navy-950'
                  : 'glass text-navy-100/80'
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all active:scale-95 ${
                  activeCategory === cat
                    ? 'gold-gradient text-navy-950'
                    : 'glass text-navy-100/80'
                }`}
              >
                {CATEGORY_META[cat].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="sticky top-[156px] z-30 glass-strong px-5 py-4 animate-slide-down">
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <label className="text-xs font-medium text-navy-200/70 mb-2 block">Sort by</label>
              <div className="flex gap-2 flex-wrap">
                {(
                  [
                    { id: 'rating', label: 'Top rated' },
                    { id: 'price-low', label: 'Price: low to high' },
                    { id: 'price-high', label: 'Price: high to low' },
                    { id: 'duration', label: 'Shortest first' },
                  ] as { id: SortMode; label: string }[]
                ).map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSortMode(opt.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      sortMode === opt.id
                        ? 'bg-gold-400/20 text-gold-300 border border-gold-400/40'
                        : 'glass text-navy-200/70'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-navy-200/70">Max budget</label>
                <span className="text-xs font-semibold text-gold-400">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-gold-400"
              />
            </div>
          </div>
        </div>
      )}

      {/* Map view */}
      {viewMode === 'map' && (
        <div className="max-w-md mx-auto px-5 mt-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={14} className="text-gold-400" />
            <span className="text-sm text-navy-200/70">Illustrated river map</span>
            <span className="text-xs text-navy-300/50 ml-auto">{CHECKPOINTS.length} checkpoints</span>
          </div>
          <RiverMap
            checkpoints={CHECKPOINTS}
            activeId={activeCheckpointId}
            onCheckpointClick={onSelectCheckpoint}
          />
          <p className="text-xs text-navy-300/50 mt-3 text-center">
            Tap any checkpoint to view details and add to your route
          </p>
        </div>
      )}

      {/* List view */}
      {viewMode === 'list' && (
        <div className="max-w-md mx-auto px-5 mt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-navy-200/60">
              {filtered.length} {filtered.length === 1 ? 'experience' : 'experiences'}
            </span>
            <div className="flex items-center gap-1 text-xs text-navy-300/50">
              <MapPin size={12} className="text-gold-400/60" />
              Kampong Ayer
            </div>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="shimmer-bg h-64 rounded-3xl animate-shimmer" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="glass-card p-6 rounded-3xl">
                <Search size={32} className="text-navy-300/40 mx-auto mb-3" />
                <p className="text-sm text-navy-200/60">No experiences match your filters</p>
                <button
                  onClick={() => {
                    setQuery('');
                    setActiveCategory('all');
                    setMaxPrice(100);
                  }}
                  className="mt-3 text-xs font-medium text-gold-400"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((exp) => (
                <ExperienceCard
                  key={exp.id}
                  experience={exp}
                  onClick={() => onSelectExperience(exp)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
