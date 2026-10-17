import React, { useState } from 'react';
import { Camera, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'twilight-lab', label: 'Twilight & Staging Lab' },
    { id: 'single-property-sites', label: 'Property Websites' },
    { id: 'services', label: 'Rates & Booking' },
    { id: 'sanity-studio', label: 'Sanity Studio' },
    { id: 'github-deploy', label: 'GitHub Hosting' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0c0d0e]/90 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('portfolio')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-bold">
            <Camera className="w-4 h-4 text-zinc-950" />
          </div>
          <span className="text-lg font-bold tracking-[0.16em] text-white uppercase whitespace-nowrap shrink-0 font-mono">
            CASA VIEW 360
          </span>
        </button>

        {/* Zone 2: 4–5 single-line clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-400">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                activeTab === link.id ? 'text-white border-b-2 border-amber-400 pb-0.5' : ''
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider text-black bg-amber-400 hover:bg-amber-300 transition-colors rounded-sm whitespace-nowrap shrink-0 uppercase font-mono"
          >
            <span>Book Ground Shoot</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-zinc-800 bg-[#0c0d0e] px-6 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="text-left text-sm py-2 text-zinc-300 hover:text-amber-400 font-medium whitespace-nowrap font-mono"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="mt-2 w-full py-2.5 text-center text-xs font-semibold tracking-wider text-black bg-amber-400 rounded-sm uppercase font-mono"
          >
            Book Ground Shoot
          </button>
        </div>
      )}
    </header>
  );
};
