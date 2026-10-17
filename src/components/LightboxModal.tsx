import React, { useEffect } from 'react';
import { PhotoAsset } from '../types';
import { X, Camera, Aperture, Clock, Sliders, MapPin, Download, Check } from 'lucide-react';

interface LightboxModalProps {
  photo: PhotoAsset | null;
  onClose: () => void;
  onSelectNext?: () => void;
  onSelectPrev?: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photo,
  onClose,
}) => {
  const [downloadSuccess, setDownloadSuccess] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!photo) return null;

  const handleDownload = (resType: 'mls' | 'full') => {
    setDownloadSuccess(true);
    // Simulate instant file download trigger
    const link = document.createElement('a');
    link.href = photo.url;
    link.download = `${photo.title.toLowerCase().replace(/\s+/g, '-')}-${resType}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadSuccess(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-6 md:p-8 animate-in fade-in duration-200">
      {/* Top Bar with Title and Close Button */}
      <div className="absolute top-0 inset-x-0 h-16 px-6 flex items-center justify-between border-b border-zinc-800 bg-black/40 z-20">
        <div className="flex items-center gap-3">
          <span className="font-serif text-lg text-white font-medium">{photo.title}</span>
          <span className="text-zinc-600">·</span>
          <span className="text-xs font-mono text-amber-400 uppercase">{photo.propertyTitle}</span>
        </div>

        <button
          onClick={onClose}
          className="p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-900 border border-zinc-800 transition-colors"
          aria-label="Close high-resolution modal"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-6xl max-h-[85vh] mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center overflow-y-auto">
        {/* Photo Container */}
        <div className="lg:col-span-8 flex items-center justify-center relative rounded-sm overflow-hidden border border-zinc-800 bg-zinc-950">
          <img
            src={photo.url}
            alt={photo.title}
            referrerPolicy="no-referrer"
            className="w-full max-h-[72vh] object-contain"
          />
        </div>

        {/* Technical EXIF & Asset Details Panel */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full bg-zinc-900/80 border border-zinc-800 p-6 rounded-sm">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono mb-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{photo.location}</span>
            </div>

            <h3 className="text-xl font-serif text-white font-medium mb-4">{photo.title}</h3>

            <div className="text-xs text-zinc-400 mb-6 leading-relaxed">
              Color calibrated in ProPhoto RGB with manual window pulls, tone mapping, and perspective
              lens correction applied for strict MLS and architectural monograph standards.
            </div>

            {/* EXIF Data Table */}
            <div className="space-y-3 border-t border-zinc-800 pt-4 text-xs font-mono">
              <div className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider mb-2">
                Technical EXIF Capture Data
              </div>

              <div className="flex items-center justify-between text-zinc-300">
                <span className="flex items-center gap-1.5 text-zinc-500">
                  <Camera className="w-3.5 h-3.5" /> Camera
                </span>
                <span className="text-white">{photo.exif.camera}</span>
              </div>

              <div className="flex items-center justify-between text-zinc-300">
                <span className="flex items-center gap-1.5 text-zinc-500">
                  <Sliders className="w-3.5 h-3.5" /> Lens
                </span>
                <span className="text-white">{photo.exif.lens}</span>
              </div>

              <div className="flex items-center justify-between text-zinc-300">
                <span className="flex items-center gap-1.5 text-zinc-500">
                  <Aperture className="w-3.5 h-3.5" /> Aperture
                </span>
                <span className="text-white">{photo.exif.aperture}</span>
              </div>

              <div className="flex items-center justify-between text-zinc-300">
                <span className="flex items-center gap-1.5 text-zinc-500">
                  <Clock className="w-3.5 h-3.5" /> Shutter Speed
                </span>
                <span className="text-white tabular-nums">{photo.exif.shutter}</span>
              </div>

              <div className="flex items-center justify-between text-zinc-300">
                <span className="text-zinc-500">ISO Sensitivity</span>
                <span className="text-white tabular-nums">{photo.exif.iso}</span>
              </div>

              <div className="flex items-center justify-between text-zinc-300">
                <span className="text-zinc-500">HDR Bracket</span>
                <span className="text-amber-400">{photo.exif.bracketCount} Exposures Blended</span>
              </div>

              <div className="flex items-center justify-between text-zinc-300">
                <span className="text-zinc-500">Method</span>
                <span className="text-amber-400 font-semibold">{photo.exif.lightingType}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-4 border-t border-zinc-800 flex flex-col gap-2">
            <button
              onClick={() => handleDownload('mls')}
              className="w-full py-2.5 px-4 text-xs font-semibold tracking-wider text-black bg-amber-400 hover:bg-amber-300 transition-colors rounded-sm uppercase flex items-center justify-center gap-2"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-black" />
                  <span>Downloaded MLS Ready File</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download MLS Web Res (2048px)</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleDownload('full')}
              className="w-full py-2.5 px-4 text-xs font-semibold tracking-wider text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-750 transition-colors rounded-sm uppercase flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-zinc-400" />
              <span>Download Master Print Res (8K)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
