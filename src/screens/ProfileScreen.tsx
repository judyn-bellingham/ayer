import { Heart, Settings, Globe, Compass, Award, ChevronRight, Bell, HelpCircle, LogOut, Moon, Star } from 'lucide-react';
import type { Experience } from '../lib/types';

interface ProfileScreenProps {
  favorites: Experience[];
  routeCount: number;
  onSelectExperience: (exp: Experience) => void;
}

export function ProfileScreen({ favorites, routeCount, onSelectExperience }: ProfileScreenProps) {
  const menuItems = [
    { icon: Bell, label: 'Notifications', value: 'On' },
    { icon: Globe, label: 'Language', value: 'English' },
    { icon: Moon, label: 'Appearance', value: 'Dark' },
    { icon: HelpCircle, label: 'Help & Support' },
    { icon: Settings, label: 'Settings' },
    { icon: LogOut, label: 'Sign out', danger: true },
  ];

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 navy-gradient" />
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gold-400/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-navy-500/20 blur-3xl" />

        <div className="relative max-w-md mx-auto px-5 pt-12 pb-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full gold-gradient p-0.5">
                <div className="w-full h-full rounded-full bg-navy-900 flex items-center justify-center">
                  <span className="font-display text-3xl font-bold text-gold-400">A</span>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full glass-strong flex items-center justify-center border-2 border-navy-900">
                <Award size={14} className="text-gold-400" />
              </div>
            </div>
            <h1 className="font-display text-2xl font-semibold text-white">Welcome, Traveler</h1>
            <p className="text-sm text-navy-200/60 mt-1">Explorer · Since 2025</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="glass-card p-3 text-center">
              <Compass size={18} className="text-gold-400 mx-auto mb-1" />
              <span className="text-lg font-semibold text-white block">{routeCount}</span>
              <span className="text-[10px] text-navy-300/60 uppercase tracking-wide">Routes</span>
            </div>
            <div className="glass-card p-3 text-center">
              <Heart size={18} className="text-gold-400 mx-auto mb-1" />
              <span className="text-lg font-semibold text-white block">{favorites.length}</span>
              <span className="text-[10px] text-navy-300/60 uppercase tracking-wide">Saved</span>
            </div>
            <div className="glass-card p-3 text-center">
              <Star size={18} className="text-gold-400 mx-auto mb-1" />
              <span className="text-lg font-semibold text-white block">4.8</span>
              <span className="text-[10px] text-navy-300/60 uppercase tracking-wide">Rating</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-5">
        {/* Saved experiences */}
        {favorites.length > 0 && (
          <section className="mt-6">
            <h2 className="font-display text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Heart size={16} className="text-gold-400" />
              Saved experiences
            </h2>
            <div className="space-y-2">
              {favorites.map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => onSelectExperience(exp)}
                  className="group flex gap-3 w-full text-left glass-card p-2.5 rounded-2xl transition-all active:scale-98 hover:border-gold-400/20"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={exp.image_url}
                      alt={exp.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0 py-1">
                    <h4 className="text-sm font-medium text-white truncate">{exp.name}</h4>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star size={11} className="text-gold-400 fill-gold-400" />
                      <span className="text-xs text-navy-200">{exp.rating}</span>
                    </div>
                    <span className="text-sm font-semibold text-gold-400 mt-0.5 block">
                      ${exp.price.toFixed(0)}
                    </span>
                  </div>
                  <ChevronRight size={16} className="text-navy-300/40 self-center" />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Menu */}
        <section className="mt-6">
          <div className="glass-card overflow-hidden">
            {menuItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-white/5 active:bg-white/5 ${
                    i !== menuItems.length - 1 ? 'border-b border-white/5' : ''
                  }`}
                >
                  <Icon
                    size={18}
                    className={item.danger ? 'text-red-300/70' : 'text-gold-400/80'}
                  />
                  <span
                    className={`flex-1 text-left text-sm font-medium ${
                      item.danger ? 'text-red-300/80' : 'text-navy-100/90'
                    }`}
                  >
                    {item.label}
                  </span>
                  {item.value && (
                    <span className="text-xs text-navy-300/50">{item.value}</span>
                  )}
                  {!item.danger && <ChevronRight size={16} className="text-navy-300/30" />}
                </button>
              );
            })}
          </div>
        </section>

        <p className="text-center text-xs text-navy-300/40 mt-6">
          Ayer · Version 1.0.0
        </p>
      </div>
    </div>
  );
}
