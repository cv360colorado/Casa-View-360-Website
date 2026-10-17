import React from 'react';
import { Camera, ShieldCheck, Github, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavClick: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  return (
    <footer className="w-full bg-[#080809] border-t border-zinc-800 text-zinc-400 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-zinc-800/80">
          {/* Brand Col */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-sm bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-bold">
                <Camera className="w-4 h-4 text-zinc-950" />
              </div>
              <span className="text-base font-bold tracking-[0.16em] text-white uppercase font-mono">
                CASA VIEW 360
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mb-6">
              Specialized interior and exterior ground real estate photography, on-site and
              virtual day-to-dusk twilight stills, virtual staging, and dedicated single property websites
              serving the entire Denver Metro Area and Front Range.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Denver Metro & REcolorado MLS Compliant</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white mb-4">
              Studio Navigation
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavClick('portfolio')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Featured Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('twilight-lab')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Day-to-Dusk Twilight Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('services')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Commercial Rates & Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('testimonials')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Client Testimonials
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('sanity-studio')}
                  className="hover:text-rose-400 transition-colors"
                >
                  Sanity Studio CMS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('github-deploy')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  GitHub Pages CI/CD Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="md:col-span-4">
            <div className="text-xs font-mono uppercase tracking-wider text-white mb-4">
              Technical Architecture
            </div>
            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex items-center justify-between py-1 border-b border-zinc-900">
                <span className="text-zinc-500">Headless CMS</span>
                <span className="text-rose-400 font-mono">Sanity Studio v3 (GROQ API)</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-zinc-900">
                <span className="text-zinc-500">Hosting & CI/CD</span>
                <span className="text-cyan-400 font-mono">GitHub Pages + GitHub Actions</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-zinc-900">
                <span className="text-zinc-500">Frontend Stack</span>
                <span className="text-white font-mono">React 19 · Vite 8 · Tailwind v4</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-zinc-500">Color Profile</span>
                <span className="text-amber-400 font-mono">ProPhoto RGB / sRGB MLS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div>
            © {new Date().getFullYear()} Casa View 360 Real Estate Photography. Denver Metro Area, CO. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Commercial Usage Terms</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-zinc-400">REcolorado MLS Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
