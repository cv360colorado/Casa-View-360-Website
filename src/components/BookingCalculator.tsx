import React, { useState } from 'react';
import { SERVICE_PACKAGES, ADD_ON_ITEMS } from '../data/mockData';
import { ServicePackage, AddOnItem, BookingSubmission } from '../types';
import { Check, Calendar, Clock, Sparkles, CheckCircle2 } from 'lucide-react';

interface BookingCalculatorProps {
  onBookingComplete?: (submission: BookingSubmission) => void;
}

export const BookingCalculator: React.FC<BookingCalculatorProps> = ({ onBookingComplete }) => {
  const [selectedPkgId, setSelectedPkgId] = useState<string>(SERVICE_PACKAGES[1].id);
  const [sqFtTier, setSqFtTier] = useState<number>(3000);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>(['addon-virtual-dusk']);
  
  // Form fields
  const [agentName, setAgentName] = useState('');
  const [agentEmail, setAgentEmail] = useState('');
  const [agentPhone, setAgentPhone] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [shootDate, setShootDate] = useState('2026-10-25');
  const [preferredTime, setPreferredTime] = useState('10:00 AM');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [submittedBooking, setSubmittedBooking] = useState<BookingSubmission | null>(null);

  const selectedPackage = SERVICE_PACKAGES.find((p) => p.id === selectedPkgId) || SERVICE_PACKAGES[0];

  // Calculate Sq Ft multiplier
  let sqFtSurcharge = 0;
  if (sqFtTier > 5000) {
    sqFtSurcharge = 150;
  } else if (sqFtTier > 3500) {
    sqFtSurcharge = 75;
  }

  // Calculate AddOns Total
  const selectedAddOns = ADD_ON_ITEMS.filter((addon) => selectedAddOnIds.includes(addon.id));
  const addOnsTotal = selectedAddOns.reduce((acc, curr) => acc + curr.price, 0);

  const totalPrice = selectedPackage.basePrice + sqFtSurcharge + addOnsTotal;

  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: BookingSubmission = {
      id: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
      agentName: agentName || 'Sarah Jenkins',
      agentEmail: agentEmail || 'sarah@compassdenver.com',
      agentPhone: agentPhone || '(303) 555-0360',
      propertyAddress: propertyAddress || '4800 S University Blvd, Cherry Hills Village, Denver, CO',
      squareFeet: sqFtTier,
      selectedPackage,
      selectedAddOns,
      shootDate,
      preferredTime,
      specialInstructions,
      totalPrice,
      createdAt: new Date().toISOString(),
    };

    setSubmittedBooking(newBooking);
    if (onBookingComplete) onBookingComplete(newBooking);
  };

  return (
    <section id="services" className="w-full py-20 bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.2em] text-amber-400 uppercase font-mono mb-2">
            <span>Specialized Photography Rates</span>
            <span aria-hidden="true">·</span>
            <span>Ground Stills, Twilight, Staging & Sites</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-white font-medium">
            Pricing Packages & Custom Shoot Estimator
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            Choose your core ground package, add virtual or on-site twilight sessions, virtual
            staging, and single property websites. Transparent pricing with zero deposit required.
          </p>
        </div>

        {/* 3 Core Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {SERVICE_PACKAGES.map((pkg) => {
            const isSelected = selectedPkgId === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPkgId(pkg.id)}
                className={`relative p-8 rounded-sm cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-zinc-900 border-amber-400 shadow-xl'
                    : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {pkg.recommended && (
                  <div className="absolute -top-3 left-6 px-2.5 py-0.5 bg-amber-400 text-zinc-950 text-[10px] font-mono font-bold tracking-wider uppercase rounded-xs">
                    Most Popular with Real Estate Agents
                  </div>
                )}

                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-serif text-white font-semibold">{pkg.name}</h3>
                      <p className="text-xs text-zinc-400 mt-1 min-h-[32px]">{pkg.tagline}</p>
                    </div>
                  </div>

                  <div className="mt-6 mb-6 pb-6 border-b border-zinc-800">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold font-mono text-white tabular-nums">
                        ${pkg.basePrice}
                      </span>
                      <span className="text-xs text-zinc-400 font-mono">/ base rate</span>
                    </div>
                    <div className="text-xs font-mono text-amber-400 mt-1">
                      Includes {pkg.photoCount} · {pkg.turnaroundHours}h Delivery
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-2.5 text-xs text-zinc-300">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  className={`mt-8 w-full py-2.5 text-xs font-semibold tracking-wider uppercase rounded-sm transition-colors ${
                    isSelected
                      ? 'bg-amber-400 text-black'
                      : 'bg-zinc-800 text-zinc-300 hover:text-white'
                  }`}
                >
                  {isSelected ? 'Selected Package' : 'Select Package'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Live Estimator & Booking Configuration Strip */}
        <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 7 Cols: Configuration Controls */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Property Size */}
              <div>
                <label className="block text-xs font-mono text-amber-400 uppercase tracking-wider mb-3">
                  1. Property Square Footage
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { label: 'Under 2,500 sq ft', value: 2000, surcharge: 0 },
                    { label: '2,500 – 3,500 sq ft', value: 3000, surcharge: 0 },
                    { label: '3,500 – 5,000 sq ft', value: 4200, surcharge: 75 },
                    { label: '5,000+ sq ft', value: 6500, surcharge: 150 },
                  ].map((tier) => (
                    <button
                      key={tier.value}
                      type="button"
                      onClick={() => setSqFtTier(tier.value)}
                      className={`p-3 text-left rounded-sm border text-xs font-mono transition-colors ${
                        sqFtTier === tier.value
                          ? 'border-amber-400 bg-amber-400/10 text-white font-semibold'
                          : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white hover:border-zinc-700'
                      }`}
                    >
                      <div className="text-zinc-200">{tier.label}</div>
                      <div className="text-[11px] text-zinc-500 mt-1">
                        {tier.surcharge > 0 ? `+$${tier.surcharge}` : 'Included'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Add-Ons strictly reflecting user services */}
              <div>
                <label className="block text-xs font-mono text-amber-400 uppercase tracking-wider mb-3">
                  2. Select Production Add-Ons
                </label>
                <div className="space-y-2.5">
                  {ADD_ON_ITEMS.map((item) => {
                    const isChecked = selectedAddOnIds.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleAddOn(item.id)}
                        className={`p-3.5 rounded-sm border cursor-pointer transition-colors flex items-center justify-between ${
                          isChecked
                            ? 'border-amber-400/80 bg-zinc-950/80'
                            : 'border-zinc-800 bg-zinc-950/40 hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-xs flex items-center justify-center border transition-colors ${
                              isChecked
                                ? 'bg-amber-400 border-amber-400 text-black'
                                : 'border-zinc-700 text-transparent'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{item.name}</div>
                            <div className="text-xs text-zinc-400">{item.description}</div>
                          </div>
                        </div>

                        <div className="text-right shrink-0 ml-4 font-mono">
                          <div className="text-sm font-semibold text-amber-400 tabular-nums">
                            +${item.price}
                          </div>
                          <div className="text-[11px] text-zinc-500">{item.unit}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Live Quote Breakdown & Booking Form */}
            <div className="lg:col-span-5 bg-zinc-950 border border-zinc-800 p-6 rounded-sm flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-4 pb-2 border-b border-zinc-800 flex items-center justify-between">
                  <span>Calculated Estimate</span>
                  <span className="text-zinc-500">No Deposit Required</span>
                </div>

                <div className="space-y-3 text-xs font-mono mb-6">
                  <div className="flex items-center justify-between text-zinc-300">
                    <span>{selectedPackage.name}</span>
                    <span className="tabular-nums text-white">${selectedPackage.basePrice}</span>
                  </div>

                  {sqFtSurcharge > 0 && (
                    <div className="flex items-center justify-between text-zinc-300">
                      <span>Square Footage Adjustment</span>
                      <span className="tabular-nums text-white">+${sqFtSurcharge}</span>
                    </div>
                  )}

                  {selectedAddOns.map((addon) => (
                    <div key={addon.id} className="flex items-center justify-between text-zinc-400">
                      <span className="truncate max-w-[200px]">{addon.name}</span>
                      <span className="tabular-nums text-amber-400">+${addon.price}</span>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-zinc-800 flex items-baseline justify-between">
                    <div>
                      <div className="text-xs text-zinc-400 uppercase">Estimated Total</div>
                      <div className="text-2xl font-bold font-mono text-white tabular-nums">
                        ${totalPrice}
                      </div>
                    </div>
                    <div className="text-right text-xs text-zinc-400">
                      <div>{selectedPackage.turnaroundHours}h Delivery</div>
                      <div className="text-amber-400">{selectedPackage.photoCount}</div>
                    </div>
                  </div>
                </div>

                {/* Instant Booking Form */}
                <form onSubmit={handleBookSubmit} className="space-y-3 pt-4 border-t border-zinc-800">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                      Agent / Broker Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins (Compass)"
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-sm text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="agent@brokerage.com"
                        value={agentEmail}
                        onChange={(e) => setAgentEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-sm text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(303) 000-0000"
                        value={agentPhone}
                        onChange={(e) => setAgentPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-sm text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                      Denver Metro Property Address
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 4800 S University Blvd, Cherry Hills Village / Denver, CO"
                      value={propertyAddress}
                      onChange={(e) => setPropertyAddress(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-sm text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={shootDate}
                        onChange={(e) => setShootDate(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-sm text-xs text-white focus:outline-none focus:border-amber-400 font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                        Preferred Time
                      </label>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-sm text-xs text-white focus:outline-none focus:border-amber-400 font-sans"
                      >
                        <option value="10:00 AM">10:00 AM (Daytime Ground Stills)</option>
                        <option value="02:00 PM">02:00 PM (Afternoon Natural Light)</option>
                        <option value="05:30 PM">05:30 PM (On-Site Blue Hour Twilight)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 py-3 text-xs font-semibold tracking-wider text-black bg-amber-400 hover:bg-amber-300 transition-colors rounded-sm uppercase flex items-center justify-center gap-2 font-mono"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Reserve Denver Ground Shoot (${totalPrice})</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Confirmation Modal */}
        {submittedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-6">
            <div className="bg-zinc-900 border border-zinc-700 max-w-lg w-full p-8 rounded-sm shadow-2xl animate-in zoom-in-95 duration-150">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                Shoot Confirmed · ID: {submittedBooking.id}
              </div>

              <h3 className="text-2xl font-serif text-white font-medium mb-3">
                Your Commission Is Reserved
              </h3>

              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                A confirmation with lockbox access requests and calendar invite (.ics) has been
                dispatched to <strong className="text-white">{submittedBooking.agentEmail}</strong>.
              </p>

              <div className="bg-zinc-950 p-4 rounded-sm border border-zinc-800 space-y-2 text-xs font-mono mb-6">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Property:</span>
                  <span className="text-white">{submittedBooking.propertyAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Scheduled:</span>
                  <span className="text-amber-400">
                    {submittedBooking.shootDate} at {submittedBooking.preferredTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Tier:</span>
                  <span className="text-white">{submittedBooking.selectedPackage.name}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-zinc-800">
                  <span className="text-zinc-400 font-semibold">Total Invoice:</span>
                  <span className="text-white font-bold tabular-nums">
                    ${submittedBooking.totalPrice}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSubmittedBooking(null)}
                className="w-full py-2.5 text-xs font-semibold tracking-wider text-black bg-amber-400 hover:bg-amber-300 rounded-sm uppercase transition-colors"
              >
                Close & View Delivery Portal
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
