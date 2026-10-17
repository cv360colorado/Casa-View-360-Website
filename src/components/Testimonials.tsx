import React, { useState, useEffect, useCallback } from 'react';
import { CLIENT_TESTIMONIALS, ClientTestimonial } from '../data/mockData';
import { ChevronLeft, ChevronRight, Quote, CheckCircle2, Pause, Play, Sparkles } from 'lucide-react';

interface TestimonialsProps {
  onBookShoot?: () => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onBookShoot }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const testimonials = CLIENT_TESTIMONIALS;
  const total = testimonials.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-play timer (pauses when hovered or user pauses)
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="w-full py-20 bg-[#0c0d0e] border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-amber-400 uppercase font-mono mb-2">
              <span>Verified Agent Feedback</span>
              <span aria-hidden="true">·</span>
              <span>Measurable Market Outcomes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white font-medium">
              Trusted by Top-Producing Real Estate Agents
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
              From competitive listing pitches to high-stakes sales, see how our ground stills,
              twilight conversions, virtual staging, and single property websites drive faster closings.
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            {/* Auto-play toggle */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="p-2 bg-zinc-900 border border-zinc-800 rounded-sm text-zinc-400 hover:text-white transition-colors"
              title={isAutoPlaying ? 'Pause autoplay' : 'Resume autoplay'}
              aria-label={isAutoPlaying ? 'Pause autoplay' : 'Resume autoplay'}
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            {/* Pagination indicator */}
            <div className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-sm text-xs font-mono text-zinc-300">
              <span className="text-amber-400 font-bold tabular-nums">
                0{currentIndex + 1}
              </span>
              <span className="text-zinc-600 mx-1">/</span>
              <span className="tabular-nums">0{total}</span>
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={prevSlide}
                className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white rounded-sm transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white rounded-sm transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Showcase Card */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative bg-zinc-950 border border-zinc-800 rounded-sm p-8 sm:p-10 lg:p-12 shadow-2xl transition-all duration-300"
        >
          {/* Subtle Quote Icon Background */}
          <Quote className="absolute top-6 right-8 w-16 h-16 text-zinc-800/40 pointer-events-none stroke-1" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left 4 Cols: Agent Avatar & Attributable Details */}
            <div className="lg:col-span-4 flex flex-col items-start border-b lg:border-b-0 lg:border-r border-zinc-800/80 pb-6 lg:pb-0 lg:pr-8">
              <div className="relative mb-5">
                <img
                  src={current.avatar}
                  alt={current.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-sm object-cover border border-zinc-700 shadow-md"
                />
                <div className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-amber-400 text-black text-[10px] font-mono font-bold uppercase rounded-xs">
                  Verified
                </div>
              </div>

              <h3 className="text-xl font-serif text-white font-medium">{current.name}</h3>
              <div className="text-xs font-mono text-zinc-400 mt-0.5">{current.role}</div>
              <div className="text-xs text-amber-400/90 font-mono mt-0.5">{current.brokerage}</div>

              {/* Clean unboxed metadata with separators */}
              <div className="mt-4 pt-4 border-t border-zinc-900 w-full text-xs font-mono text-zinc-400 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Market:</span>
                  <span className="text-zinc-300">{current.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Service:</span>
                  <span className="text-zinc-200">{current.serviceUsed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Property:</span>
                  <span className="text-zinc-400 truncate max-w-[170px]">
                    {current.listingAddress}
                  </span>
                </div>
              </div>
            </div>

            {/* Right 8 Cols: Large Testimonial Statement & Measurable Outcome */}
            <div className="lg:col-span-8 flex flex-col justify-between h-full">
              {/* Measurable Outcome Strip */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-sm self-start text-xs font-mono mb-6">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-zinc-400">Outcome:</span>
                <span className="text-emerald-400 font-semibold">{current.measurableOutcome}</span>
              </div>

              {/* Quote Body */}
              <blockquote className="text-lg sm:text-xl lg:text-2xl font-serif text-zinc-100 leading-relaxed mb-8">
                “{current.quote}”
              </blockquote>

              {/* Bottom Carousel Selector Dots */}
              <div className="flex items-center justify-between pt-6 border-t border-zinc-800/80">
                <div className="flex items-center gap-2">
                  {testimonials.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-1.5 transition-all duration-300 rounded-full ${
                        currentIndex === idx
                          ? 'w-8 bg-amber-400'
                          : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {onBookShoot && (
                  <button
                    onClick={onBookShoot}
                    className="text-xs font-mono font-semibold text-amber-400 hover:text-amber-300 uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <span>Book Your Next Listing Shoot →</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3 Quick Proof Badges */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-zinc-400">
          <div className="p-4 bg-zinc-900/40 border border-zinc-800/60 rounded-sm flex items-center gap-3">
            <span className="text-amber-400 font-bold text-base tabular-nums">98.4%</span>
            <span>Brokerage Client Re-Booking Rate</span>
          </div>
          <div className="p-4 bg-zinc-900/40 border border-zinc-800/60 rounded-sm flex items-center gap-3">
            <span className="text-amber-400 font-bold text-base tabular-nums">&lt;24h</span>
            <span>Average Delivery Turnaround Time</span>
          </div>
          <div className="p-4 bg-zinc-900/40 border border-zinc-800/60 rounded-sm flex items-center gap-3">
            <span className="text-amber-400 font-bold text-base tabular-nums">0%</span>
            <span>MLS Photo Rejection or Penalty Rate</span>
          </div>
        </div>
      </div>
    </section>
  );
};
