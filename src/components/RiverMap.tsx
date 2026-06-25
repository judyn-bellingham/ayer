import { useState } from 'react';
import { Sunset, Eye, UtensilsCrossed, Camera, Building2, Trees } from 'lucide-react';
import type { Checkpoint, CheckpointCategory } from '../lib/types';
import { CHECKPOINT_META } from '../lib/types';

interface RiverMapProps {
  checkpoints: Checkpoint[];
  activeId: string | null;
  onCheckpointClick: (cp: Checkpoint) => void;
}

const ICONS: Record<CheckpointCategory, typeof Sunset> = {
  sunset: Sunset,
  monkey: Eye,
  restaurant: UtensilsCrossed,
  photo: Camera,
  mosque: Building2,
  mangrove: Trees,
};

export function RiverMap({ checkpoints, activeId, onCheckpointClick }: RiverMapProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden glass-card">
      {/* Background gradient — deep river water */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-700 via-navy-800 to-navy-900" />

      {/* SVG illustrated river and landmasses */}
      <svg
        viewBox="0 0 300 400"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a5c" />
            <stop offset="50%" stopColor="#152234" />
            <stop offset="100%" stopColor="#0d1828" />
          </linearGradient>
          <linearGradient id="landGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a2d1a" />
            <stop offset="100%" stopColor="#0f1f0f" />
          </linearGradient>
          <linearGradient id="landGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e2d1e" />
            <stop offset="100%" stopColor="#0d1a0d" />
          </linearGradient>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e9b433" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#e9b433" stopOpacity="0" />
          </radialGradient>
          <pattern id="ripple" x="0" y="0" width="40" height="12" patternUnits="userSpaceOnUse">
            <path
              d="M0 6 Q10 0 20 6 T40 6"
              fill="none"
              stroke="#3a5277"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </pattern>
        </defs>

        {/* Left landmass — water village stilt houses */}
        <path
          d="M0 0 L0 180 Q20 170 35 175 Q50 185 45 200 Q40 220 55 230 Q70 240 60 260 Q50 280 65 290 Q80 300 70 320 Q60 340 75 360 Q85 380 80 400 L0 400 Z"
          fill="url(#landGrad)"
          opacity="0.85"
        />

        {/* Right landmass — mangrove forest */}
        <path
          d="M300 0 L300 400 L220 400 Q210 380 225 370 Q240 360 235 340 Q230 320 245 310 Q260 300 250 280 Q240 260 255 250 Q270 240 265 220 Q260 200 275 190 Q290 180 285 160 Q280 140 295 130 L300 120 Z"
          fill="url(#landGrad2)"
          opacity="0.85"
        />

        {/* Small island */}
        <ellipse cx="150" cy="340" rx="30" ry="12" fill="url(#landGrad)" opacity="0.7" />

        {/* River water */}
        <rect x="0" y="0" width="300" height="400" fill="url(#riverGrad)" opacity="0.6" />

        {/* Water ripple texture */}
        <rect x="0" y="0" width="300" height="400" fill="url(#ripple)" />

        {/* Main river channel — winding path */}
        <path
          d="M55 0 Q70 40 60 80 Q50 120 70 160 Q90 200 75 240 Q60 280 85 320 Q110 360 95 400"
          fill="none"
          stroke="#2a4a6e"
          strokeWidth="3"
          opacity="0.5"
          strokeDasharray="6 4"
        />

        {/* Stilt house dots on left landmass */}
        {[40, 55, 48, 62, 50, 68, 55, 72, 58, 70].map((y, i) => {
          const x = 15 + (i % 3) * 12;
          return (
            <rect
              key={`house-${i}`}
              x={x}
              y={y * 4 + 10}
              width="4"
              height="4"
              rx="0.5"
              fill="#d4a017"
              opacity="0.4"
            />
          );
        })}

        {/* Mangrove tree dots on right landmass */}
        {[260, 275, 268, 282, 270, 278, 285, 272, 280, 265].map((x, i) => {
          const y = 30 + i * 35;
          return (
            <circle
              key={`tree-${i}`}
              cx={x}
              cy={y}
              r="3"
              fill="#2d5a2d"
              opacity="0.5"
            />
          );
        })}

        {/* Mosque silhouette near mosque viewpoint */}
        <g transform="translate(90, 120)" opacity="0.6">
          <rect x="-4" y="-8" width="8" height="12" rx="1" fill="#d4a017" />
          <circle cx="0" cy="-10" r="3" fill="#d4a017" />
          <line x1="0" y1="-13" x2="0" y2="-15" stroke="#d4a017" strokeWidth="0.5" />
        </g>

        {/* Compass rose */}
        <g transform="translate(260, 40)" opacity="0.4">
          <circle cx="0" cy="0" r="14" fill="none" stroke="#e9b433" strokeWidth="0.5" />
          <path d="M0 -10 L2 0 L0 10 L-2 0 Z" fill="#e9b433" opacity="0.6" />
          <text x="0" y="-16" textAnchor="middle" fontSize="6" fill="#e9b433" fontFamily="serif">
            N
          </text>
        </g>

        {/* Glow under active checkpoint */}
        {activeId &&
          (() => {
            const cp = checkpoints.find((c) => c.id === activeId);
            if (!cp) return null;
            return (
              <circle
                cx={(cp.x / 100) * 300}
                cy={(cp.y / 100) * 400}
                r="30"
                fill="url(#glow)"
              />
            );
          })()}
      </svg>

      {/* Map label */}
      <div className="absolute top-3 left-3 glass px-3 py-1.5 rounded-full pointer-events-none">
        <span className="text-[10px] font-medium tracking-wider uppercase text-gold-300">
          Kampong Ayer
        </span>
      </div>

      {/* Checkpoint pins */}
      {checkpoints.map((cp) => {
        const meta = CHECKPOINT_META[cp.category];
        const Icon = ICONS[cp.category];
        const isActive = activeId === cp.id;
        const isHovered = hoveredId === cp.id;

        return (
          <button
            key={cp.id}
            onClick={() => onCheckpointClick(cp)}
            onMouseEnter={() => setHoveredId(cp.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
            style={{ left: `${cp.x}%`, top: `${cp.y}%` }}
          >
            <div
              className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-12 h-12 scale-110'
                  : isHovered
                    ? 'w-11 h-11'
                    : 'w-9 h-9'
              }`}
              style={{
                background: `linear-gradient(135deg, ${meta.color}dd, ${meta.color}99)`,
                boxShadow: isActive
                  ? `0 0 0 4px ${meta.color}33, 0 4px 20px ${meta.color}66`
                  : `0 2px 12px ${meta.color}44`,
              }}
            >
              <Icon
                size={isActive ? 22 : 16}
                className="text-white drop-shadow"
                strokeWidth={2.5}
              />
              {/* Pulse ring for active */}
              {isActive && (
                <span
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{ background: meta.color, opacity: 0.3 }}
                />
              )}
            </div>

            {/* Label tooltip */}
            {(isHovered || isActive) && (
              <div className="absolute left-1/2 -translate-x-1/2 -top-9 whitespace-nowrap glass-strong px-2.5 py-1 rounded-lg pointer-events-none animate-fade-in">
                <span className="text-[10px] font-medium text-white">{cp.name}</span>
              </div>
            )}
          </button>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-3 left-3 right-3 glass-strong rounded-2xl p-3 pointer-events-none">
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(CHECKPOINT_META) as CheckpointCategory[]).map((cat) => {
            const meta = CHECKPOINT_META[cat];
            const Icon = ICONS[cat];
            return (
              <div key={cat} className="flex items-center gap-1.5">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: `${meta.color}cc` }}
                >
                  <Icon size={9} className="text-white" strokeWidth={2.5} />
                </div>
                <span className="text-[9px] text-navy-100/70 truncate">{meta.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
