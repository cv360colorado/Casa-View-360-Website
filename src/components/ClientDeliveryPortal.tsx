import React, { useState } from 'react';
import { PropertyListing, PhotoAsset } from '../types';
import { Download, Heart, Link, Copy, Check, ShieldCheck, ExternalLink, Image } from 'lucide-react';

interface ClientDeliveryPortalProps {
  properties: PropertyListing[];
  onOpenPhoto: (photo: PhotoAsset) => void;
}

export const ClientDeliveryPortal: React.FC<ClientDeliveryPortalProps> = ({
  properties,
  onOpenPhoto,
}) => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(properties[0]?._id || '');
  const [favoritePhotoIds, setFavoritePhotoIds] = useState<string[]>([]);
  const [copiedTourUrl, setCopiedTourUrl] = useState(false);
  const [downloadingZip, setDownloadingZip] = useState<string | null>(null);

  const currentProperty = properties.find((p) => p._id === selectedPropertyId) || properties[0];

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavoritePhotoIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleCopyTour = () => {
    const unbrandedUrl = `https://tour.casaview360.com/unbranded/${currentProperty.slug}`;
    navigator.clipboard.writeText(unbrandedUrl);
    setCopiedTourUrl(true);
    setTimeout(() => setCopiedTourUrl(false), 2000);
  };

  const handleSimulateZipDownload = (format: 'mls' | 'print') => {
    setDownloadingZip(format);
    setTimeout(() => {
      setDownloadingZip(null);
      // Trigger a dummy file download
      const element = document.createElement('a');
      element.setAttribute(
        'href',
        'data:text/plain;charset=utf-8,' +
          encodeURIComponent(
            `Casa View 360 Real Estate Photography Delivery Manifest\nProperty: ${currentProperty.title}\nDenver Metro Area MLS / REcolorado Compliant\nFormat: ${format.toUpperCase()}\nResolution: ${
              format === 'mls' ? '2048px Web-Optimized' : 'Original 8K Print Uncompressed'
            }\nDate: ${new Date().toISOString()}`
          )
      );
      element.setAttribute('download', `${currentProperty.slug}-${format}-archive.txt`);
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1200);
  };

  return (
    <section className="w-full py-20 bg-[#0c0d0e] border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-amber-400 uppercase font-mono mb-2">
              <span>Agent Proofing & Asset Download</span>
              <span aria-hidden="true">·</span>
              <span>MLS Compliance Portal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white font-medium">
              Client Delivery & Media Management
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
              Instant access for brokerages to download MLS-ready (2048px) web packages, copy
              unbranded virtual tour URLs for MLS compliance, and review retouching notes.
            </p>
          </div>

          {/* Property Selector Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-500 uppercase">Select Shoot:</span>
            <select
              value={selectedPropertyId}
              onChange={(e) => setSelectedPropertyId(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 text-xs font-mono text-white rounded-sm px-3 py-2 focus:outline-none focus:border-amber-400"
            >
              {properties.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.title} ({p.city})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Portal Dashboard Card */}
        <div className="p-8 bg-zinc-950 border border-zinc-800 rounded-sm">
          {/* Top Info Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-8 border-b border-zinc-800 gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
                <span>{currentProperty.mlsNumber || 'MLS-Active'}</span>
                <span aria-hidden="true">·</span>
                <span>{currentProperty.clientName}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-white font-medium">
                {currentProperty.title}
              </h3>
              <div className="text-xs text-zinc-400 mt-1 font-mono">
                {currentProperty.address}, {currentProperty.city} · {currentProperty.squareFeet.toLocaleString()} sq ft
              </div>
            </div>

            {/* Quick Delivery Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleSimulateZipDownload('mls')}
                disabled={!!downloadingZip}
                className="px-4 py-2.5 text-xs font-mono font-semibold text-black bg-amber-400 hover:bg-amber-300 rounded-sm flex items-center gap-2 transition-colors uppercase"
              >
                <Download className="w-4 h-4" />
                <span>
                  {downloadingZip === 'mls' ? 'Preparing MLS ZIP...' : 'Download MLS (2048px)'}
                </span>
              </button>

              <button
                onClick={() => handleSimulateZipDownload('print')}
                disabled={!!downloadingZip}
                className="px-4 py-2.5 text-xs font-mono font-semibold text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-sm flex items-center gap-2 transition-colors uppercase"
              >
                <Download className="w-4 h-4 text-zinc-400" />
                <span>{downloadingZip === 'print' ? 'Preparing Print...' : 'Download 8K Print'}</span>
              </button>

              <button
                onClick={handleCopyTour}
                className="px-4 py-2.5 text-xs font-mono bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-sm flex items-center gap-2 transition-colors"
              >
                {copiedTourUrl ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied MLS Tour URL</span>
                  </>
                ) : (
                  <>
                    <Link className="w-4 h-4 text-zinc-400" />
                    <span>Copy Unbranded Tour URL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Delivered Photos Gallery */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                Delivered Photo Assets ({currentProperty.gallery.length} files)
              </span>
              <span className="text-xs font-mono text-zinc-500">
                {favoritePhotoIds.length} marked as favorites
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {currentProperty.gallery.map((photo) => {
                const isFav = favoritePhotoIds.includes(photo.id);
                return (
                  <div
                    key={photo.id}
                    onClick={() => onOpenPhoto(photo)}
                    className="group relative aspect-[4/3] rounded-sm overflow-hidden border border-zinc-800 bg-zinc-900 cursor-pointer shadow-md hover:border-zinc-600 transition-all"
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Favorite Heart Button */}
                    <button
                      onClick={(e) => toggleFavorite(photo.id, e)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-colors ${
                        isFav
                          ? 'bg-rose-500 text-white border-rose-400'
                          : 'bg-black/60 text-zinc-300 border-white/20 hover:text-white'
                      }`}
                      aria-label="Favorite photo"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                    </button>

                    {/* Bottom Info Scrim */}
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between">
                      <span className="text-xs text-white font-medium truncate">{photo.title}</span>
                      <span className="text-[10px] font-mono text-amber-400 uppercase">
                        {photo.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Photographer Retouching Notes Accordion */}
          {currentProperty.photographerNotes && (
            <div className="mt-8 p-4 bg-zinc-900/50 border border-zinc-800/80 rounded-sm">
              <div className="text-xs font-mono text-zinc-400 uppercase mb-1">
                Studio Retouching & Compliance Notes
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                {currentProperty.photographerNotes}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
