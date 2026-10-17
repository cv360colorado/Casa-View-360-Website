import React, { useState, useRef, useCallback } from 'react';
import {
  EXTERIOR_DAYTIME_IMG,
  HERO_TWILIGHT_IMG,
  VACANT_ROOM_IMG,
  STAGED_ROOM_IMG,
} from '../data/mockData';
import { Sun, Moon, Sofa, Home, MoveHorizontal, CheckCircle2, Sparkles, Camera } from 'lucide-react';

interface DayToDuskSliderProps {
  onBookService: (serviceName?: string) => void;
}

export const DayToDuskSlider: React.FC<DayToDuskSliderProps> = ({ onBookService }) => {
  const [activeMode, setActiveMode] = useState<'twilight' | 'staging'>('twilight');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPercentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(clampedPercentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handlePointerDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const isTwilight = activeMode === 'twilight';
  const beforeImg = isTwilight ? EXTERIOR_DAYTIME_IMG : VACANT_ROOM_IMG;
  const afterImg = isTwilight ? HERO_TWILIGHT_IMG : STAGED_ROOM_IMG;
  const beforeLabel = isTwilight ? 'DAYTIME SUNLIGHT' : 'VACANT / UNFURNISHED';
  const afterLabel = isTwilight ? 'BLUE-HOUR TWILIGHT (ON-SITE / VIRTUAL)' : 'VIRTUALLY STAGED (DESIGNER FURNITURE)';

  return (
    <section id="twilight-lab" className="w-full py-20 bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-amber-400 uppercase font-mono mb-2">
              <span>Interactive Visual Lab</span>
              <span aria-hidden="true">·</span>
              <span>Day-to-Dusk & Virtual Staging</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white font-medium">
              See the Before & After Transformation
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
              Drag the interactive slider to compare daytime exteriors against twilight lighting, or
              inspect vacant rooms transformed with realistic virtual staging.
            </p>
          </div>

          {/* Mode Switcher (Twilight vs Staging) */}
          <div className="flex items-center gap-2 p-1 bg-zinc-900 border border-zinc-800 rounded-sm self-start md:self-auto">
            <button
              onClick={() => {
                setActiveMode('twilight');
                setSliderPosition(50);
              }}
              className={`px-4 py-2 text-xs font-mono rounded-sm transition-colors flex items-center gap-2 ${
                activeMode === 'twilight'
                  ? 'bg-amber-400 text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Day-to-Dusk Twilight</span>
            </button>
            <button
              onClick={() => {
                setActiveMode('staging');
                setSliderPosition(50);
              }}
              className={`px-4 py-2 text-xs font-mono rounded-sm transition-colors flex items-center gap-2 ${
                activeMode === 'staging'
                  ? 'bg-amber-400 text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Sofa className="w-3.5 h-3.5" />
              <span>Virtual Staging</span>
            </button>
          </div>
        </div>

        {/* Quick Position Presets */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-mono text-zinc-400">
            {isTwilight ? (
              <span>Comparing: Ground Daytime Still vs Twilight Glow</span>
            ) : (
              <span>Comparing: Vacant Raw Interior vs Virtually Staged Living Space</span>
            )}
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-zinc-900/80 border border-zinc-800 rounded-sm">
            <button
              onClick={() => setSliderPosition(0)}
              className={`px-2.5 py-1 text-xs font-mono rounded-sm transition-colors ${
                sliderPosition === 0 ? 'bg-amber-400 text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              0% (Before)
            </button>
            <button
              onClick={() => setSliderPosition(50)}
              className={`px-2.5 py-1 text-xs font-mono rounded-sm transition-colors ${
                sliderPosition === 50 ? 'bg-amber-400 text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              50% (Split)
            </button>
            <button
              onClick={() => setSliderPosition(100)}
              className={`px-2.5 py-1 text-xs font-mono rounded-sm transition-colors ${
                sliderPosition === 100 ? 'bg-amber-400 text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              100% (After)
            </button>
          </div>
        </div>

        {/* Interactive Comparison Container */}
        <div
          ref={containerRef}
          onMouseDown={handlePointerDown}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[620px] rounded-sm overflow-hidden border border-zinc-700 select-none cursor-ew-resize group shadow-2xl"
        >
          {/* Base Layer: After (Right side) */}
          <img
            src={afterImg}
            alt={afterLabel}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Reveal Layer: Before (Left side, clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={beforeImg}
              alt={beforeLabel}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover max-w-none"
              style={{
                width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                height: '100%',
              }}
            />
          </div>

          {/* Divider Line and Handle */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-amber-400 z-20 shadow-[0_0_12px_rgba(251,191,36,0.9)]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-amber-400 text-zinc-950 flex items-center justify-center shadow-lg border-2 border-white">
              <MoveHorizontal className="w-4 h-4" />
            </div>
          </div>

          {/* Floating Badges */}
          <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-black/80 backdrop-blur-sm border border-zinc-700 text-xs font-mono text-zinc-200 rounded-sm flex items-center gap-1.5">
            {isTwilight ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Home className="w-3.5 h-3.5 text-zinc-400" />}
            <span>{beforeLabel}</span>
          </div>

          <div className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-black/80 backdrop-blur-sm border border-zinc-700 text-xs font-mono text-zinc-200 rounded-sm flex items-center gap-1.5">
            {isTwilight ? <Moon className="w-3.5 h-3.5 text-amber-300" /> : <Sofa className="w-3.5 h-3.5 text-amber-400" />}
            <span>{afterLabel}</span>
          </div>

          {/* Bottom Info Ribbon */}
          <div className="absolute bottom-4 inset-x-4 z-10 p-3 bg-black/85 backdrop-blur-sm border border-zinc-800 rounded-sm flex flex-wrap items-center justify-between text-xs text-zinc-300">
            <span className="font-mono text-amber-400">
              Drag slider left or right to inspect the quality of light and perspective
            </span>
            <span className="font-mono text-zinc-400">
              {isTwilight
                ? 'Available as Virtual Dusk ($45/photo) or On-Site Twilight ($165)'
                : 'Virtual Staging available at $45/room'}
            </span>
          </div>
        </div>

        {/* 3 Domain Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-zinc-900/60 border border-zinc-800/80 rounded-sm">
            <div className="flex items-center gap-2 text-white font-medium text-base mb-2">
              <Moon className="w-4 h-4 text-amber-400" />
              <span>On-Site & Virtual Day-to-Dusk</span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed">
              We offer both options: shoot physically on-site during sunset/blue hour for authentic
              ambient light, or send daytime ground stills for virtual day-to-dusk transformation with
              warm glowing windows and sunset skies.
            </p>
          </div>

          <div className="p-6 bg-zinc-900/60 border border-zinc-800/80 rounded-sm">
            <div className="flex items-center gap-2 text-white font-medium text-base mb-2">
              <Sofa className="w-4 h-4 text-amber-400" />
              <span>Virtual Staging for Vacant Listings</span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Help buyers visualize scale and function without the multi-thousand dollar expense of
              physical furniture staging. We stage living rooms, primary bedrooms, and dining spaces.
            </p>
          </div>

          <div className="p-6 bg-zinc-900/60 border border-zinc-800/80 rounded-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-white font-medium text-base mb-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Single Property Websites</span>
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Package your ground stills, twilight photos, and staged rooms into a dedicated,
                responsive single property website with unbranded MLS compliance links.
              </p>
            </div>
            <button
              onClick={() => onBookService('twilight')}
              className="mt-4 text-xs font-mono font-semibold text-amber-400 hover:text-amber-300 uppercase tracking-wider text-left"
            >
              Book This Service →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
