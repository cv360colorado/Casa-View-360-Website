import React, { useState } from 'react';
import { PhotoAsset } from '../types';
import { INITIAL_PHOTOS } from '../data/mockData';
import { Expand, MapPin } from 'lucide-react';

interface PortfolioGridProps {
  onSelectPhoto: (photo: PhotoAsset) => void;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ onSelectPhoto }) => {
  const [filter, setFilter] = useState<string>('all');

  const filteredPhotos = INITIAL_PHOTOS.filter((photo) => {
    if (filter === 'all') return true;
    if (filter === 'interior') return photo.category === 'interior';
    if (filter === 'exterior') return photo.category === 'exterior';
    if (filter === 'twilight') return photo.category === 'twilight';
    if (filter === 'virtual-staging') return photo.category === 'virtual-staging';
    return true;
  });

  return (
    <section id="portfolio" className="w-full py-20 bg-[#0c0d0e] border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header & Interactive Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-amber-400 uppercase font-mono mb-2">
              <span>Denver Metro Ground Portfolio</span>
              <span aria-hidden="true">·</span>
              <span>Casa View 360</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white font-medium">
              Denver Interiors, Exteriors, Twilight & Virtual Staging
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
              Captured exclusively at eye-level and tripod ground perspectives across Cherry Creek,
              Wash Park, LoDo, Cherry Hills Village, and the greater Denver Front Range.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-sm self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-colors whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-amber-400 text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Works ({INITIAL_PHOTOS.length})
            </button>
            <button
              onClick={() => setFilter('interior')}
              className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-colors whitespace-nowrap ${
                filter === 'interior'
                  ? 'bg-amber-400 text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Ground Interiors
            </button>
            <button
              onClick={() => setFilter('exterior')}
              className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-colors whitespace-nowrap ${
                filter === 'exterior'
                  ? 'bg-amber-400 text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Ground Exteriors
            </button>
            <button
              onClick={() => setFilter('twilight')}
              className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-colors whitespace-nowrap ${
                filter === 'twilight'
                  ? 'bg-amber-400 text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Day-to-Dusk Twilight
            </button>
            <button
              onClick={() => setFilter('virtual-staging')}
              className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-colors whitespace-nowrap ${
                filter === 'virtual-staging'
                  ? 'bg-amber-400 text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Virtual Staging
            </button>
          </div>
        </div>

        {/* Dynamic Bento Box Photography Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {filteredPhotos.map((photo, index) => {
            const isWide = index === 0 || index === 2;
            const colSpan = isWide ? 'md:col-span-7' : 'md:col-span-5';
            const aspectClass = isWide ? 'aspect-[16/10]' : 'aspect-[4/3]';

            return (
              <div
                key={photo.id}
                onClick={() => onSelectPhoto(photo)}
                className={`${colSpan} group relative rounded-sm overflow-hidden border border-zinc-800 bg-zinc-900 cursor-pointer shadow-lg hover:border-zinc-600 transition-all duration-300`}
              >
                <div className={`w-full ${aspectClass} overflow-hidden relative`}>
                  <img
                    src={photo.url}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Top-Right Expand Indicator */}
                  <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Expand className="w-4 h-4" />
                  </div>

                  {/* Scrim Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-5">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-400 uppercase tracking-wider mb-1">
                      <MapPin className="w-3 h-3" />
                      <span>{photo.location}</span>
                      <span aria-hidden="true" className="text-zinc-500">·</span>
                      <span className="text-zinc-400">{photo.propertyTitle}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-serif text-white font-medium">
                      {photo.title}
                    </h3>

                    {/* Unboxed Metadata Line with typographic separators */}
                    <div className="mt-2 flex items-center gap-2 text-xs font-mono text-zinc-400 pt-2 border-t border-zinc-800">
                      <span>{photo.exif.lightingType}</span>
                      <span aria-hidden="true">·</span>
                      <span>{photo.exif.camera}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-400 font-semibold">{photo.exif.aperture}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Divider Ribbon */}
        <div className="mt-16 py-4 border-y border-zinc-800 text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 overflow-hidden whitespace-nowrap">
          <div className="flex items-center gap-8 justify-around">
            <span>GROUND LEVEL INTERIOR & EXTERIOR STILLS</span>
            <span>·</span>
            <span>DAY-TO-DUSK VIRTUAL & ON-SITE TWILIGHT</span>
            <span>·</span>
            <span>DESIGNER VIRTUAL STAGING</span>
            <span>·</span>
            <span>SINGLE PROPERTY WEBSITES</span>
          </div>
        </div>
      </div>
    </section>
  );
};
