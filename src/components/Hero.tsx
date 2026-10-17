import React from 'react';
import { HERO_TWILIGHT_IMG } from '../data/mockData';
import { ArrowRight, Sliders, CheckCircle2, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExplorePortfolio: () => void;
  onOpenBooking: () => void;
  onOpenTwilightLab: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExplorePortfolio,
  onOpenBooking,
  onOpenTwilightLab,
}) => {
  return (
    <section className="relative w-full border-b border-zinc-800 bg-[#0c0d0e]">
      {/* 2-Column Split Hero Frame */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Clean Unboxed Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-amber-400 uppercase font-mono mb-4">
              <span>Denver Metro Area</span>
              <span aria-hidden="true">·</span>
              <span>Casa View 360</span>
            </div>

            {/* Hero Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.15] mb-6 font-serif">
              Denver Interior & Exterior Ground Photos, Twilight & Virtual Staging.
            </h1>

            {/* Lead Copy tailored strictly to the user's services */}
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl mb-8">
              Specialized real estate media by Casa View 360 serving the entire Denver Metro Area.
              Precision ground stills with true window exposure pulls, on-site Rocky Mountain dusk and
              virtual day-to-dusk conversions, virtual staging, and single property websites built with Sanity CMS.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 text-xs font-semibold tracking-wider text-black bg-amber-400 hover:bg-amber-300 transition-colors rounded-sm uppercase flex items-center gap-2 whitespace-nowrap font-mono"
              >
                <span>Calculate Denver Shoot Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenTwilightLab}
                className="px-6 py-3 text-xs font-semibold tracking-wider text-zinc-200 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 transition-colors rounded-sm uppercase flex items-center gap-2 whitespace-nowrap font-mono"
              >
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span>Day-to-Dusk & Staging Lab</span>
              </button>

              <button
                onClick={onExplorePortfolio}
                className="px-4 py-3 text-xs font-medium text-zinc-400 hover:text-white transition-colors underline underline-offset-4 whitespace-nowrap"
              >
                View Denver Portfolio
              </button>
            </div>

            {/* Trust Markers */}
            <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center gap-6 text-xs text-zinc-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Serving All Denver Metro & Foothills</span>
              </div>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>True Window Pulls (Zero Mountain Glare)</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>24h REcolorado MLS Delivery</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Container */}
          <div className="lg:col-span-5 relative group">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[4/3] w-full rounded-sm overflow-hidden border border-zinc-700/80 shadow-2xl">
              <img
                src={HERO_TWILIGHT_IMG}
                alt="Cherry Hills Village Architectural Manor - On-Site Blue Hour Twilight Ground Exterior"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Bottom Scrim with Architectural Meta */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end">
                <div className="flex items-center justify-between text-xs text-zinc-300">
                  <span className="font-semibold text-white">Cherry Hills Village Manor</span>
                  <span className="font-mono text-amber-300">Denver Metro Dusk Session</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono mt-1">
                  <span>Cherry Hills Village, CO</span>
                  <span aria-hidden="true">·</span>
                  <span>Tripod Eye-Level Ground Elevation</span>
                  <span aria-hidden="true">·</span>
                  <span>f/8.0 · 3.2s</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width KPI Strip (Below the 2-column split) */}
        <div className="mt-16 pt-10 border-t border-zinc-800 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight tabular-nums">
              24 Hours
            </div>
            <div className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-mono">
              Turnaround Delivery
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight tabular-nums">
              4 Core
            </div>
            <div className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-mono">
              Specialized Services
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight tabular-nums">
              100%
            </div>
            <div className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-mono">
              MLS Photo Compliance
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-bold text-amber-400 font-mono tracking-tight tabular-nums">
              3.2x More
            </div>
            <div className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-mono">
              Views with Twilight Stills
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
