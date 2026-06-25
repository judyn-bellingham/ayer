import { useEffect } from 'react';
import { Star, Clock, X, Plus, Check, Sunset, Eye, UtensilsCrossed, Camera, Building2, Trees } from 'lucide-react';
import type { Checkpoint, CheckpointCategory } from '../lib/types';
import { CHECKPOINT_META } from '../lib/types';

interface CheckpointCardProps {
  checkpoint: Checkpoint | null;
  onClose: () => void;
  onAddToRoute: (cp: Checkpoint) => void;
  isInRoute: boolean;
}

const ICONS: Record<CheckpointCategory, typeof Sunset> = {
  sunset: Sunset,
  monkey: Eye,
  restaurant: UtensilsCrossed,
  photo: Camera,
  mosque: Building2,
  mangrove: Trees,
};

export function CheckpointCard({ checkpoint, onClose, onAddToRoute, isInRoute }: CheckpointCardProps) {
  useEffect(() => {
    if (checkpoint) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [checkpoint]);

  if (!checkpoint) return null;

  const meta = CHECKPOINT_META[checkpoint.category];
  const Icon = ICONS[checkpoint.category];

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center">
      <div
        className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md glass-strong rounded-t-3xl animate-slide-up overflow-hidden max-h-[85vh] overflow-y-auto no-scrollbar">
        {/* Drag handle */}
        <div className="sticky top-0 z-10 flex justify-center pt-3 pb-2 bg-gradient-to-b from-navy-800/95 to-transparent backdrop-blur-sm">
          <div className="w-10 h-1 rounded-full bg-navy-200/30" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 glass w-9 h-9 rounded-full flex items-center justify-center transition-transform active:scale-90"
        >
          <X size={18} className="text-white" />
        </button>

        {/* Photo */}
        <div className="relative h-52 -mt-6 overflow-hidden">
          <img
            src={checkpoint.image_url}
            alt={checkpoint.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-800 via-transparent to-transparent" />

          {/* Category badge */}
          <div
            className="absolute top-4 left-4 px-3 py-1.5 rounded-full flex items-center gap-1.5"
            style={{ background: `${meta.color}cc`, backdropFilter: 'blur(12px)' }}
          >
            <Icon size={12} className="text-white" strokeWidth={2.5} />
            <span className="text-xs font-medium text-white">{meta.label}</span>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pb-8">
          {/* Rating */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-full">
              <Star size={13} className="text-gold-400 fill-gold-400" />
              <span className="text-sm font-semibold text-white">{checkpoint.rating}</span>
              <span className="text-xs text-navy-200">({checkpoint.review_count})</span>
            </div>
          </div>

          {/* Name */}
          <h2 className="font-display text-2xl font-semibold text-white mb-3 text-balance">
            {checkpoint.name}
          </h2>

          {/* Description */}
          <p className="text-sm leading-relaxed text-navy-100/80 mb-5">
            {checkpoint.description}
          </p>

          {/* Best visiting time */}
          <div className="glass-card p-4 mb-6">
            <div className="flex items-center gap-2 mb-1">
              <Clock size={15} className="text-gold-400" />
              <span className="text-xs font-medium tracking-wider uppercase text-gold-300">
                Best visiting time
              </span>
            </div>
            <p className="text-base font-medium text-white">{checkpoint.best_time}</p>
          </div>

          {/* Add to route button */}
          <button
            onClick={() => onAddToRoute(checkpoint)}
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
                Add to route
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
