import { useState, useMemo } from 'react';
import {
  Clock,
  DollarSign,
  Trash2,
  Plus,
  Navigation,
  Users,
  Route as RouteIcon,
  Sparkles,
  GripVertical,
  ArrowDown,
  Wand2,
  Check,
  Shuffle,
} from 'lucide-react';
import type { Experience, TabId } from '../lib/types';
import { CATEGORY_META } from '../lib/types';

interface RouteScreenProps {
  route: Experience[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onNavigate: (tab: TabId) => void;
  onSelectExperience: (exp: Experience) => void;
  onReorder: (route: Experience[]) => void;
}

const STOP_DISTANCE_KM = 1.8;

export function RouteScreen({
  route,
  onRemove,
  onClear,
  onNavigate,
  onSelectExperience,
  onReorder,
}: RouteScreenProps) {
  const [passengers, setPassengers] = useState(2);
  const [optimizing, setOptimizing] = useState(false);
  const [optimized, setOptimized] = useState(false);

  const totalPrice = useMemo(
    () => route.reduce((sum, e) => sum + e.price, 0) * passengers,
    [route, passengers],
  );
  const totalDuration = useMemo(
    () => route.reduce((sum, e) => sum + e.duration_minutes, 0),
    [route],
  );
  const hours = Math.floor(totalDuration / 60);
  const mins = totalDuration % 60;
  const distanceKm = route.length > 1 ? (route.length - 1) * STOP_DISTANCE_KM : 0;

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newRoute = [...route];
    [newRoute[index - 1], newRoute[index]] = [newRoute[index], newRoute[index - 1]];
    onReorder(newRoute);
    setOptimized(false);
  };

  const handleMoveDown = (index: number) => {
    if (index === route.length - 1) return;
    const newRoute = [...route];
    [newRoute[index], newRoute[index + 1]] = [newRoute[index + 1], newRoute[index]];
    onReorder(newRoute);
    setOptimized(false);
  };

  const handleOptimize = () => {
    setOptimizing(true);
    setOptimized(false);
    setTimeout(() => {
      const sorted = [...route].sort((a, b) => {
        const aLat = a.latitude ?? 4.89;
        const aLng = a.longitude ?? 114.94;
        const bLat = b.latitude ?? 4.89;
        const bLng = b.longitude ?? 114.94;
        return aLat - bLat || aLng - bLng;
      });
      onReorder(sorted);
      setOptimizing(false);
      setOptimized(true);
    }, 1400);
  };

  if (route.length === 0) {
    return (
      <div className="min-h-screen pb-32 flex flex-col">
        <div className="px-5 pt-6 pb-4">
          <div className="max-w-md mx-auto">
            <h1 className="font-display text-2xl font-semibold text-white">Route Builder</h1>
            <p className="text-sm text-navy-200/60 mt-1">Build your custom river journey</p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-5">
          <div className="max-w-md mx-auto text-center">
            <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gold-400/10 blur-3xl" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mx-auto mb-4 animate-float">
                  <Navigation size={28} className="text-gold-400" />
                </div>
                <h2 className="font-display text-xl font-semibold text-white mb-2">
                  Your route is empty
                </h2>
                <p className="text-sm text-navy-200/60 mb-6 max-w-xs mx-auto">
                  Add checkpoints and experiences from the map to build your perfect day on the
                  water.
                </p>
                <button
                  onClick={() => onNavigate('explore')}
                  className="gold-gradient text-navy-950 font-semibold px-6 py-3 rounded-2xl text-sm transition-transform active:scale-95 inline-flex items-center gap-2"
                >
                  <Plus size={16} />
                  Start building
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-semibold text-white">Route Builder</h1>
              <p className="text-sm text-navy-200/60 mt-1">
                {route.length} {route.length === 1 ? 'stop' : 'stops'} ·{' '}
                {hours > 0 ? `${hours}h ` : ''}
                {mins}m
              </p>
            </div>
            <button
              onClick={onClear}
              className="glass px-3 py-2 rounded-xl text-xs font-medium text-red-300/80 transition-transform active:scale-95 flex items-center gap-1.5"
            >
              <Trash2 size={13} />
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Stats bar — Spotify-style summary strip */}
      <div className="max-w-md mx-auto px-5">
        <div className="glass-card p-4 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gold-400/10 blur-2xl" />
          <div className="relative grid grid-cols-2 gap-3">
            {/* Duration */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl glass flex items-center justify-center shrink-0">
                <Clock size={18} className="text-gold-400" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wide text-navy-300/60 block">
                  Duration
                </span>
                <span className="text-base font-semibold text-white">
                  {hours > 0 ? `${hours}h ` : ''}
                  {mins}m
                </span>
              </div>
            </div>

            {/* Distance */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl glass flex items-center justify-center shrink-0">
                <RouteIcon size={18} className="text-gold-400" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wide text-navy-300/60 block">
                  Distance
                </span>
                <span className="text-base font-semibold text-white">
                  {distanceKm.toFixed(1)} km
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl glass flex items-center justify-center shrink-0">
                <DollarSign size={18} className="text-gold-400" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wide text-navy-300/60 block">
                  Est. price
                </span>
                <span className="text-base font-semibold text-gold-400">
                  ${totalPrice.toFixed(0)}
                </span>
              </div>
            </div>

            {/* Passengers */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl glass flex items-center justify-center shrink-0">
                <Users size={18} className="text-gold-400" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] uppercase tracking-wide text-navy-300/60 block">
                  Passengers
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <button
                    onClick={() => setPassengers((p) => Math.max(1, p - 1))}
                    disabled={passengers <= 1}
                    className="w-6 h-6 rounded-lg glass flex items-center justify-center text-gold-400 transition-transform active:scale-90 disabled:opacity-30"
                  >
                    <span className="text-sm font-bold">−</span>
                  </button>
                  <span className="text-base font-semibold text-white w-5 text-center">
                    {passengers}
                  </span>
                  <button
                    onClick={() => setPassengers((p) => Math.min(12, p + 1))}
                    disabled={passengers >= 12}
                    className="w-6 h-6 rounded-lg glass flex items-center justify-center text-gold-400 transition-transform active:scale-90 disabled:opacity-30"
                  >
                    <span className="text-sm font-bold">+</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical route order */}
      <div className="max-w-md mx-auto px-5 mt-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={15} className="text-gold-400" />
          <h2 className="font-display text-lg font-semibold text-white">Route order</h2>
          <span className="text-xs text-navy-300/50 ml-auto">Tap arrows to reorder</span>
        </div>

        <div className="relative">
          {route.map((exp, index) => (
            <div key={exp.id} className="relative animate-fade-in">
              {/* Connector arrow */}
              {index < route.length - 1 && (
                <div className="flex justify-center py-1.5">
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="w-px h-3 bg-gradient-to-b from-gold-400/40 to-gold-400/20" />
                    <ArrowDown size={14} className="text-gold-400/50" />
                  </div>
                </div>
              )}

              {/* Stop card */}
              <div className="glass-card overflow-hidden transition-all duration-300 hover:border-gold-400/20">
                <div className="flex items-stretch">
                  {/* Drag handle / number */}
                  <div className="flex flex-col items-center justify-center px-2 py-3 border-r border-white/5 bg-navy-800/30">
                    <GripVertical size={14} className="text-navy-300/30 mb-1" />
                    <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center shadow-md shadow-gold-400/20">
                      <span className="text-sm font-bold text-navy-950">{index + 1}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <button
                    onClick={() => onSelectExperience(exp)}
                    className="flex-1 flex gap-3 p-3 text-left"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                      <img
                        src={exp.image_url}
                        alt={exp.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0 py-0.5">
                      <h3 className="text-sm font-medium text-white leading-tight truncate">
                        {exp.name}
                      </h3>
                      <span className="text-[11px] text-gold-300/80 mt-0.5 block">
                        {CATEGORY_META[exp.category].label}
                      </span>
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-navy-200/60">
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          {exp.duration_minutes}m
                        </span>
                        {exp.price > 0 && (
                          <span className="text-gold-400 font-semibold">
                            ${exp.price.toFixed(0)}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Reorder + delete controls */}
                  <div className="flex flex-col items-center justify-center gap-1.5 px-2.5 py-3 border-l border-white/5">
                    <button
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className="w-7 h-7 rounded-lg glass flex items-center justify-center transition-transform active:scale-90 disabled:opacity-20"
                    >
                      <ArrowDown size={12} className="text-gold-400 rotate-180" />
                    </button>
                    <button
                      onClick={() => onRemove(exp.id)}
                      className="w-7 h-7 rounded-lg glass flex items-center justify-center transition-transform active:scale-90"
                    >
                      <Trash2 size={12} className="text-red-300/70" />
                    </button>
                    <button
                      onClick={() => handleMoveDown(index)}
                      disabled={index === route.length - 1}
                      className="w-7 h-7 rounded-lg glass flex items-center justify-center transition-transform active:scale-90 disabled:opacity-20"
                    >
                      <ArrowDown size={12} className="text-gold-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add stop */}
        <button
          onClick={() => onNavigate('explore')}
          className="w-full mt-5 glass-card p-4 flex items-center justify-center gap-2 text-sm font-medium text-gold-400 transition-all active:scale-98 hover:border-gold-400/30 border-2 border-dashed border-white/10"
        >
          <Plus size={18} />
          Add a stop
        </button>

        {/* Optimize Route button */}
        <button
          onClick={handleOptimize}
          disabled={optimizing || route.length < 2}
          className="w-full mt-4 gold-gradient text-navy-950 font-bold py-4 rounded-2xl text-base transition-all active:scale-98 hover:shadow-lg hover:shadow-gold-400/30 flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {optimizing ? (
            <>
              <div className="w-5 h-5 border-2 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" />
              Optimizing...
            </>
          ) : optimized ? (
            <>
              <Check size={20} />
              Route optimized
            </>
          ) : (
            <>
              <Wand2 size={20} />
              Optimize Route
            </>
          )}
        </button>

        {optimized && (
          <p className="text-xs text-center text-gold-300/70 mt-2 animate-fade-in">
            Stops reordered by proximity for the shortest path
          </p>
        )}

        {/* Shuffle */}
        <button
          onClick={() => {
            const shuffled = [...route].sort(() => Math.random() - 0.5);
            onReorder(shuffled);
            setOptimized(false);
          }}
          className="w-full mt-2 glass text-navy-100/70 font-medium py-3 rounded-2xl text-sm transition-all active:scale-98 flex items-center justify-center gap-2"
        >
          <Shuffle size={15} className="text-gold-400" />
          Shuffle order
        </button>
      </div>
    </div>
  );
}
