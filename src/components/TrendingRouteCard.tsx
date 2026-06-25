import { Star, Clock, DollarSign, ArrowUpRight } from 'lucide-react';

export interface TrendingRoute {
  id: string;
  name: string;
  description: string;
  image_url: string;
  rating: number;
  review_count: number;
  duration_label: string;
  price: number;
  stops: number;
  tag: string;
}

interface TrendingRouteCardProps {
  route: TrendingRoute;
  onClick?: () => void;
}

export function TrendingRouteCard({ route, onClick }: TrendingRouteCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative w-full h-80 rounded-3xl overflow-hidden text-left transition-transform duration-300 active:scale-98"
    >
      <img
        src={route.image_url}
        alt={route.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-navy-950/10" />

      {/* Tag */}
      <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-full">
        <span className="text-xs font-medium text-gold-300">{route.tag}</span>
      </div>

      {/* Rating badge */}
      <div className="absolute top-4 right-4 glass px-3 py-1.5 rounded-full flex items-center gap-1.5">
        <Star size={13} className="text-gold-400 fill-gold-400" />
        <span className="text-xs font-semibold text-white">{route.rating}</span>
        <span className="text-[10px] text-navy-200/70">({route.review_count})</span>
      </div>

      {/* Arrow */}
      <div className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 rounded-full glass-strong flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
        <ArrowUpRight size={18} className="text-gold-400" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-display text-2xl font-semibold text-white mb-1 text-balance">
          {route.name}
        </h3>
        <p className="text-sm text-navy-100/70 mb-3 line-clamp-1">{route.description}</p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-navy-100/80">
            <Clock size={13} className="text-gold-400" />
            {route.duration_label}
          </div>
          <div className="w-px h-3 bg-white/15" />
          <div className="flex items-center gap-1.5 text-xs text-navy-100/80">
            <DollarSign size={13} className="text-gold-400" />
            <span className="font-semibold text-gold-400">${route.price}</span>
            <span className="text-navy-200/50">/ person</span>
          </div>
          <div className="w-px h-3 bg-white/15" />
          <div className="flex items-center gap-1.5 text-xs text-navy-100/80">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
            {route.stops} stops
          </div>
        </div>
      </div>
    </button>
  );
}
