/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DayToDuskSlider } from './components/DayToDuskSlider';
import { PortfolioGrid } from './components/PortfolioGrid';
import { SinglePropertySitePreview } from './components/SinglePropertySitePreview';
import { Testimonials } from './components/Testimonials';
import { BookingCalculator } from './components/BookingCalculator';
import { ClientDeliveryPortal } from './components/ClientDeliveryPortal';
import { SanityStudio } from './components/SanityStudio';
import { GitHubDeployHub } from './components/GitHubDeployHub';
import { Footer } from './components/Footer';
import { LightboxModal } from './components/LightboxModal';
import { INITIAL_PROPERTIES } from './data/mockData';
import { PhotoAsset, PropertyListing } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('portfolio');
  const [properties, setProperties] = useState<PropertyListing[]>(INITIAL_PROPERTIES);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoAsset | null>(null);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-zinc-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      {/* 1-Row 3-Zone Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={() => scrollToSection('services')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Architectural Hero */}
        <Hero
          onExplorePortfolio={() => scrollToSection('portfolio')}
          onOpenBooking={() => scrollToSection('services')}
          onOpenTwilightLab={() => scrollToSection('twilight-lab')}
        />

        {/* Interactive Day-to-Dusk Twilight & Virtual Staging Lab */}
        <DayToDuskSlider onBookService={() => scrollToSection('services')} />

        {/* Ground Portfolio Bento Grid */}
        <PortfolioGrid onSelectPhoto={(photo) => setSelectedPhoto(photo)} />

        {/* Dedicated Single Property Websites Interactive Showcase */}
        <SinglePropertySitePreview
          property={properties[0]}
          onBookWebsite={() => scrollToSection('services')}
        />

        {/* Client Testimonials Carousel */}
        <Testimonials onBookShoot={() => scrollToSection('services')} />

        {/* Pricing Packages & Custom Shoot Estimator */}
        <BookingCalculator />

        {/* Client Delivery & Proofing Portal */}
        <ClientDeliveryPortal
          properties={properties}
          onOpenPhoto={(photo) => setSelectedPhoto(photo)}
        />

        {/* Sanity Studio CMS & GROQ Playground */}
        <SanityStudio
          properties={properties}
          onUpdateProperties={(newProps) => setProperties(newProps)}
        />

        {/* GitHub Hosting & CI/CD Deployment Hub */}
        <GitHubDeployHub />
      </main>

      {/* Footer */}
      <Footer onNavClick={scrollToSection} />

      {/* Fullscreen Photo Lightbox Modal */}
      <LightboxModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </div>
  );
}
