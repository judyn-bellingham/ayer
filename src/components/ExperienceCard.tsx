import { Star, Clock, MapPin } from 'lucide-react';
import type { Experience } from '../lib/types';
import { CATEGORY_META } from '../lib/types';

interface ExperienceCardProps {
  experience: Experience;
  onClick: () => void;
  variant?: 'default' | 'compact' | 'featured';
}

export function ExperienceCard({ experience, onClick, variant = 'default' }: ExperienceCardProps) {
  if (variant === 'featured') {
    return (
      <button
        onClick={onClick}
        className="group relative shrink-0 w-72 h-96 rounded-3xl overflow-hidden text-left transition-transform duration-300 active:scale-95"
      >
        <img
          src={experience.image_url}
          alt={experience.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
        <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-full">
          <span className="text-xs font-medium text-gold-300">
            {CATEGORY_META[experience.category].label}
          </span>
        </div>
        <div className="absolute top-4 right-4 glass px-2.5 py-1.5 rounded-full flex items-center gap-1">
          <Star size={12} className="text-gold-400 fill-gold-400" />
          <span className="text-xs font-semibold text-white">{experience.rating}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-display text-xl font-semibold text-white mb-1 text-balance">
            {experience.name}
          </h3>
          <p className="text-sm text-navy-100/80 mb-3 line-clamp-2">{experience.short_desc}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-navy-100/70">
              <MapPin size={12} />
              <span className="truncate max-w-[120px]">{experience.location_label}</span>
            </div>
            <span className="text-lg font-semibold text-gold-400">
              ${experience.price.toFixed(0)}
            </span>
          </div>
        </div>
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={onClick}
        className="group flex gap-3 w-full text-left rounded-2xl p-2 transition-all duration-200 active:scale-98 hover:bg-white/5"
      >
        <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
          <img
            src={experience.image_url}
            alt={experience.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0 py-0.5">
          <h4 className="text-sm font-medium text-white truncate">{experience.name}</h4>
          <div className="flex items-center gap-1 mt-0.5">
            <Star size={11} className="text-gold-400 fill-gold-400" />
            <span className="text-xs text-navy-200">{experience.rating}</span>
            <span className="text-xs text-navy-300">· {experience.review_count} reviews</span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs text-navy-300">
            <Clock size={11} />
            <span>{experience.duration_minutes} min</span>
          </div>
          <span className="text-sm font-semibold text-gold-400 mt-0.5 block">
            ${experience.price.toFixed(0)}
          </span>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="group glass-card overflow-hidden text-left transition-all duration-300 active:scale-98 hover:border-gold-400/30 w-full"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={experience.image_url}
          alt={experience.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
        <div className="absolute top-3 left-3 glass px-2.5 py-1 rounded-full">
          <span className="text-[11px] font-medium text-gold-300">
            {CATEGORY_META[experience.category].label}
          </span>
        </div>
        <div className="absolute top-3 right-3 glass px-2 py-1 rounded-full flex items-center gap-1">
          <Star size={11} className="text-gold-400 fill-gold-400" />
          <span className="text-xs font-semibold text-white">{experience.rating}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-white mb-1 text-balance">
          {experience.name}
        </h3>
        <p className="text-sm text-navy-200/70 line-clamp-2 mb-3">{experience.short_desc}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-navy-200/60">
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {experience.duration_minutes}m
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {experience.location_label.split(' ').slice(0, 3).join(' ')}
            </span>
          </div>
          <span className="text-lg font-semibold text-gold-400">
            ${experience.price.toFixed(0)}
          </span>
        </div>
      </div>
    </button>
  );
}
