import { useEffect } from 'react';
import { Star, Clock, MapPin, X, Plus, Check, Tag } from 'lucide-react';
import type { Experience } from '../lib/types';
import { CATEGORY_META } from '../lib/types';

interface ExperienceSheetProps {
  experience: Experience | null;
  onClose: () => void;
  onAddToRoute: (experience: Experience) => void;
  isInRoute: boolean;
}

export function ExperienceSheet({ experience, onClose, onAddToRoute, isInRoute }: ExperienceSheetProps) {
  useEffect(() => {
    if (experience) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [experience]);

  if (!experience) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center">
      <div
        className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md max-h-[88vh] overflow-y-auto no-scrollbar glass-strong rounded-t-3xl animate-slide-up">
        <div className="sticky top-0 z-10 flex justify-center pt-3 pb-2 bg-gradient-to-b from-navy-800/95 to-transparent backdrop-blur-sm">
          <div className="w-10 h-1 rounded-full bg-navy-200/30" />
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 glass w-9 h-9 rounded-full flex items-center justify-center transition-transform active:scale-90"
        >
          <X size={18} className="text-white" />
        </button>

        <div className="relative h-56 -mt-6 overflow-hidden">
          <img
            src={experience.image_url}
            alt={experience.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-800 via-transparent to-transparent" />
        </div>

        <div className="px-5 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="glass px-3 py-1 rounded-full text-xs font-medium text-gold-300">
              {CATEGORY_META[experience.category].label}
            </span>
            <div className="flex items-center gap-1 glass px-2.5 py-1 rounded-full">
              <Star size={12} className="text-gold-400 fill-gold-400" />
              <span className="text-xs font-semibold text-white">{experience.rating}</span>
              <span className="text-xs text-navy-200">({experience.review_count})</span>
            </div>
          </div>

          <h2 className="font-display text-2xl font-semibold text-white mb-2 text-balance">
            {experience.name}
          </h2>

          <div className="flex items-center gap-4 text-sm text-navy-200/70 mb-4">
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-gold-400" />
              {experience.duration_minutes} min
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-gold-400" />
              {experience.location_label}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-navy-100/80 mb-5">
            {experience.description}
          </p>

          {experience.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {experience.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 glass px-2.5 py-1 rounded-lg text-xs text-navy-100/70"
                >
                  <Tag size={10} className="text-gold-400/60" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="glass-card p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-navy-200/70">Price per person</span>
              <span className="text-2xl font-semibold text-gold-400">
                ${experience.price.toFixed(0)}
              </span>
            </div>
            <p className="text-xs text-navy-300/60">All taxes and fees included</p>
          </div>

          <button
            onClick={() => onAddToRoute(experience)}
            disabled={isInRoute}
            className={`w-full py-4 rounded-2xl font-semibold text-base transition-all duration-300 active:scale-98 flex items-center justify-center gap-2 ${
              isInRoute
                ? 'glass text-gold-400 cursor-default'
                : 'gold-gradient text-navy-950 hover:shadow-lg hover:shadow-gold-400/30'
            }`}
          >
            {isInRoute ? (
              <>
                <Check size={20} />
                Added to your route
              </>
            ) : (
              <>
                <Plus size={20} />
                Add to my route
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
