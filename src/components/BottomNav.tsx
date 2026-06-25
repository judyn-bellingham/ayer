import { Home, Compass, MapPin, User } from 'lucide-react';
import type { TabId } from '../lib/types';

interface BottomNavProps {
  active: TabId;
  onChange: (tab: TabId) => void;
  routeCount?: number;
}

const TABS: { id: TabId; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'explore', label: 'Explore', icon: Compass },
  { id: 'route', label: 'My Route', icon: MapPin },
  { id: 'profile', label: 'Profile', icon: User },
];

export function BottomNav({ active, onChange, routeCount = 0 }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-4 pt-2 pointer-events-none">
      <div className="glass-strong pointer-events-auto flex items-center justify-around rounded-3xl px-2 py-2 shadow-2xl shadow-black/50 w-full max-w-md safe-bottom">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="relative flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 group"
            >
              <div
                className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                  isActive ? 'bg-gold-400/15 scale-100' : 'scale-0'
                }`}
              />
              <div className="relative">
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`transition-all duration-300 ${
                    isActive
                      ? 'text-gold-400 -translate-y-0.5'
                      : 'text-navy-200 group-active:scale-90'
                  }`}
                />
                {tab.id === 'route' && routeCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-gold-400 text-navy-950 text-[10px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1">
                    {routeCount}
                  </span>
                )}
              </div>
              <span
                className={`relative text-[10px] font-medium tracking-wide transition-all duration-300 ${
                  isActive ? 'text-gold-400 opacity-100' : 'text-navy-200 opacity-70'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
