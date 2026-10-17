import React, { useState } from 'react';
import { PropertyListing } from '../types';
import {
  Globe,
  Smartphone,
  Monitor,
  ExternalLink,
  ShieldCheck,
  Check,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Share2
} from 'lucide-react';

interface SinglePropertySitePreviewProps {
  property: PropertyListing;
  onBookWebsite: () => void;
}

export const SinglePropertySitePreview: React.FC<SinglePropertySitePreviewProps> = ({
  property,
  onBookWebsite,
}) => {
  const [viewMode, setViewMode] = useState<'branded' | 'unbranded'>('branded');
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const photos = property.gallery;
  const currentPhoto = photos[activePhotoIdx] || photos[0];

  const handleCopyLink = () => {
    const url = viewMode === 'branded'
      ? `https://${property.slug}.casaview360.com`
      : `https://${property.slug}.casaview360.com/unbranded-recolorado`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="single-property-sites" className="w-full py-20 bg-[#0c0d0e] border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-cyan-400 uppercase font-mono mb-2">
              <span>Turnkey Listing Marketing</span>
              <span aria-hidden="true">·</span>
              <span>Single Property Websites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white font-medium">
              Dedicated Single Property Websites
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
              Every shoot can be packaged into a standalone luxury single property website. Includes
              both an unbranded MLS-compliant tour link and a branded agent marketing page with direct lead capture.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2 p-1 bg-zinc-900 border border-zinc-800 rounded-sm self-start md:self-auto">
            <button
              onClick={() => setViewMode('branded')}
              className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-colors ${
                viewMode === 'branded'
                  ? 'bg-cyan-500 text-zinc-950 font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Branded Agent Mode
            </button>
            <button
              onClick={() => setViewMode('unbranded')}
              className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-colors ${
                viewMode === 'unbranded'
                  ? 'bg-cyan-500 text-zinc-950 font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Unbranded MLS Tour Mode
            </button>
          </div>
        </div>

        {/* Interactive Browser Frame */}
        <div className="bg-zinc-950 border border-zinc-700 rounded-sm overflow-hidden shadow-2xl">
          {/* Mock Browser URL Bar */}
          <div className="px-4 py-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
              <div className="ml-4 px-3 py-1 bg-zinc-950 border border-zinc-800 rounded-xs text-zinc-300 flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  https://{property.slug}.casaview360.com
                  {viewMode === 'unbranded' ? '/recolorado-mls' : ''}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyLink}
                className="text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Copy URL'}</span>
              </button>
            </div>
          </div>

          {/* Website Canvas Area */}
          <div className="bg-[#121316] text-white p-6 sm:p-8 lg:p-10">
            {/* Website Top Bar */}
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-zinc-800">
              <div>
                <span className="text-xs font-mono tracking-widest uppercase text-cyan-400">
                  {viewMode === 'branded' ? property.clientName : 'OFFICIAL VIRTUAL TOUR'}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-semibold text-white mt-1">
                  {property.title}
                </h3>
                <div className="text-xs font-mono text-zinc-400 mt-0.5">
                  {property.address}, {property.city}
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
                  ${(property.listPrice).toLocaleString()}
                </div>
                <div className="text-xs font-mono text-zinc-400">
                  {property.bedrooms} Beds · {property.bathrooms} Baths · {property.squareFeet.toLocaleString()} Sq Ft
                </div>
              </div>
            </div>

            {/* Main Photography Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Photo Viewport */}
              <div className="lg:col-span-8 space-y-4">
                <div className="relative aspect-[16/10] rounded-sm overflow-hidden border border-zinc-800 bg-black">
                  <img
                    src={currentPhoto.url}
                    alt={currentPhoto.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/80 rounded-xs text-xs font-mono text-zinc-200">
                    {currentPhoto.title} · {currentPhoto.category.toUpperCase()}
                  </div>
                </div>

                {/* Thumbnails row */}
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {photos.map((photo, idx) => (
                    <button
                      key={photo.id}
                      onClick={() => setActivePhotoIdx(idx)}
                      className={`relative w-24 h-16 shrink-0 rounded-xs overflow-hidden border transition-all ${
                        activePhotoIdx === idx
                          ? 'border-cyan-400 ring-1 ring-cyan-400'
                          : 'border-zinc-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={photo.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Sidebar: Branded Contact vs Unbranded MLS Specs */}
              <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 p-6 rounded-sm">
                {viewMode === 'branded' ? (
                  <div>
                    <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
                      Listing Representation
                    </div>
                    <h4 className="text-lg font-serif text-white font-medium">Sarah Jenkins</h4>
                    <div className="text-xs text-zinc-400 mb-4">{property.clientName}</div>

                    <div className="space-y-2 text-xs font-mono text-zinc-300 mb-6">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-cyan-400" />
                        <span>(303) 555-0360</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-cyan-400" />
                        <span>agent@compassdenver.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Cherry Creek, Denver, CO</span>
                      </div>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); alert('Lead sent to listing agent!'); }} className="space-y-3 pt-4 border-t border-zinc-800">
                      <div className="text-xs font-semibold text-white">Request Private Showing</div>
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-sm text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400"
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-sm text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400"
                      />
                      <button
                        type="submit"
                        className="w-full py-2.5 text-xs font-semibold tracking-wider text-zinc-950 bg-cyan-400 hover:bg-cyan-300 rounded-sm uppercase transition-colors"
                      >
                        Send Tour Inquiry
                      </button>
                    </form>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
                      <ShieldCheck className="w-4 h-4" />
                      <span>MLS Unbranded Verified</span>
                    </div>
                    <h4 className="text-base font-serif text-white font-medium mb-3">
                      Property Specifications
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      Complies strictly with local MLS and NAR virtual tour regulations. Zero agent
                      contact info, logos, or brokerage branding.
                    </p>

                    <div className="space-y-2.5 text-xs font-mono border-t border-zinc-800 pt-3">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">MLS Number:</span>
                        <span className="text-zinc-200">{property.mlsNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Property Type:</span>
                        <span className="text-zinc-200">Single Family Residential</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Ground Photos:</span>
                        <span className="text-amber-400">{photos.length} High-Res Stills</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Twilight Photo:</span>
                        <span className="text-emerald-400">Included (On-Site / Dusk)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Feature summary callout */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between p-6 bg-zinc-900 border border-zinc-800 rounded-sm gap-4">
          <div>
            <div className="text-sm font-semibold text-white">
              Add a Single Property Website to Any Shoot for $85
            </div>
            <div className="text-xs text-zinc-400 mt-0.5">
              Includes custom address domain or slug, unbranded MLS link, and free GitHub Pages hosting.
            </div>
          </div>
          <button
            onClick={onBookWebsite}
            className="px-5 py-2.5 text-xs font-semibold tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 rounded-sm uppercase transition-colors shrink-0 font-mono"
          >
            Add Website to Booking
          </button>
        </div>
      </div>
    </section>
  );
};
