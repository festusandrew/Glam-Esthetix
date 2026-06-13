/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Clock, Heart, Sparkles, ChevronRight, RefreshCw, Eye } from 'lucide-react';
import { SERVICES, IMAGES } from '../data';

interface ServicesProps {
  onBookService: (serviceId: string) => void;
}

export default function Services({ onBookService }: ServicesProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'lashes' | 'brows' | 'waxing'>('all');

  const filteredServices = SERVICES.filter(service => 
    activeCategory === 'all' ? true : service.category === activeCategory
  );

  return (
    <section id="services" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-b border-[#1A1008]/10">
      
      {/* Editorial Header Section */}
      <div className="mb-20">
        <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#C9995A] font-semibold mb-3">
          Our Specializations
        </p>
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-8">
          <h2 className="font-display text-4xl font-light text-[#1A1008] tracking-tight whitespace-nowrap">
            Core Custom Treatments
          </h2>
          <div className="h-[0.5px] bg-[#C9995A]/30 w-full mt-4 sm:mt-0"></div>
        </div>
      </div>

      {/* Sincere-style Numbered Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#1A1008]/10 divide-y md:divide-y-0 md:divide-x divide-[#1A1008]/10 mb-24">
        
        {/* Lash Extensions Spec */}
        <div className="p-8 lg:p-12 hover:bg-[#FAF9F5]/60 transition-all duration-300 relative group flex flex-col justify-between overflow-hidden">
          <div className="space-y-6">
            <div className="flex justify-between items-baseline">
              <span className="font-display text-4xl text-[#C9995A]/30 font-light group-hover:text-[#C9995A] transition-colors">01</span>
              <span className="text-[10px] uppercase tracking-widest text-[#1A1008]/30 font-mono">Lashes</span>
            </div>

            {/* Deluxe Lash Image Frame */}
            <div className="relative w-full aspect-[16/10] overflow-hidden border border-[#1A1008]/10 group-hover:border-[#C9995A]/30 transition-all duration-700 bg-[#FAF9F5] shadow-inner">
              <img 
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600&h=400"
                alt="Elite lash extensions mapping"
                className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-[1200ms] opacity-90 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <span className="absolute bottom-2 left-2 text-[8px] font-mono tracking-widest text-[#1A1008]/70 uppercase px-2 py-0.5 bg-[#FAF9F5]/90 backdrop-blur-xs border border-[#1A1008]/10">
                Premium Mapping
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-2xl font-light text-[#1A1008]">Lash Extensions</h3>
              <p className="text-xs text-[#1A1008]/70 leading-relaxed font-light">
                Professional classic, textured hybrid, and deep volume sets crafted to frame individual iris structures and accommodate daily routines beautifully.
              </p>
            </div>
          </div>

          {/* Direct Lineart Vector Graphic representing lashes directly injected */}
          <div className="my-6 text-center flex justify-center py-2 relative">
            <svg viewBox="0 0 100 50" className="w-20 h-10 text-[#C9995A]/15 group-hover:text-[#C9995A]/40 transition-colors duration-500 stroke-[0.5] fill-none">
              <path d="M10 40 Q50 15 90 40" stroke="currentColor"/>
              <path d="M50 28 L50 10" stroke="currentColor"/>
              <path d="M40 29 L32 12" stroke="currentColor"/>
              <path d="M30 31 L18 16" stroke="currentColor"/>
              <path d="M20 34 L6 22" stroke="currentColor"/>
              <path d="M60 29 L68 12" stroke="currentColor"/>
              <path d="M70 31 L82 16" stroke="currentColor"/>
              <path d="M80 34 L94 22" stroke="currentColor"/>
            </svg>
          </div>

          <div className="pt-6 border-t border-[#1A1008]/10 flex justify-between items-center text-xs">
            <span className="text-[#C9995A] font-bold">From $85</span>
            <button
              onClick={() => {
                setActiveCategory('lashes');
                const target = document.getElementById('price-panel');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[#C9995A] uppercase tracking-[0.15em] font-bold flex items-center space-x-1 hover:text-[#1A1008] transition-colors cursor-pointer"
            >
              <span>View catalog</span>
              <ChevronRight size={12} />
            </button>
          </div>
        </div>

        {/* Brows Spec */}
        <div className="p-8 lg:p-12 hover:bg-[#FAF9F5]/60 transition-all duration-300 relative group flex flex-col justify-between overflow-hidden">
          <div className="space-y-6">
            <div className="flex justify-between items-baseline">
              <span className="font-display text-4xl text-[#C9995A]/30 font-light group-hover:text-[#C9995A] transition-colors">02</span>
              <span className="text-[10px] uppercase tracking-widest text-[#1A1008]/30 font-mono">Brows</span>
            </div>

            {/* Deluxe Brow Image Frame */}
            <div className="relative w-full aspect-[16/10] overflow-hidden border border-[#1A1008]/10 group-hover:border-[#C9995A]/30 transition-all duration-700 bg-[#FAF9F5] shadow-inner">
              <img 
                src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=600&h=400"
                alt="Elite custom brow sculpting"
                className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-[1200ms] opacity-90 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <span className="absolute bottom-2 left-2 text-[8px] font-mono tracking-widest text-[#1A1008]/70 uppercase px-2 py-0.5 bg-[#FAF9F5]/90 backdrop-blur-xs border border-[#1A1008]/10">
                Custom Sculpt
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-2xl font-light text-[#1A1008]">Brow Shape &amp; Tint</h3>
              <p className="text-xs text-[#1A1008]/70 leading-relaxed font-light">
                Architectural brow mapping, customized long-hold tint shading, and keratin feather lamination tailored with millimeter precision.
              </p>
            </div>
          </div>

          {/* Symmetrical brow lineart vector symbol */}
          <div className="my-6 text-center flex justify-center py-2 relative">
            <svg viewBox="0 0 100 50" className="w-20 h-10 text-[#C9995A]/15 group-hover:text-[#C9995A]/40 transition-colors duration-500 stroke-[0.5] fill-none">
              <path d="M10 32 C30 18, 50 18, 90 28" stroke="currentColor"/>
              <path d="M10 28 C28 14, 52 14, 88 23" stroke="currentColor"/>
              <circle cx="50" cy="38" r="4" stroke="currentColor"/>
            </svg>
          </div>

          <div className="pt-6 border-t border-[#1A1008]/10 flex justify-between items-center text-xs">
            <span className="text-[#C9995A] font-bold">From $30</span>
            <button
              onClick={() => {
                setActiveCategory('brows');
                const target = document.getElementById('price-panel');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[#C9995A] uppercase tracking-[0.15em] font-bold flex items-center space-x-1 hover:text-[#1A1008] transition-colors cursor-pointer"
            >
              <span>View catalog</span>
              <ChevronRight size={12} />
            </button>
          </div>
        </div>

        {/* Facial Waxing Spec */}
        <div className="p-8 lg:p-12 hover:bg-[#FAF9F5]/60 transition-all duration-300 relative group flex flex-col justify-between overflow-hidden">
          <div className="space-y-6">
            <div className="flex justify-between items-baseline">
              <span className="font-display text-4xl text-[#C9995A]/30 font-light group-hover:text-[#C9995A] transition-colors">03</span>
              <span className="text-[10px] uppercase tracking-widest text-[#1A1008]/30 font-mono">Waxing</span>
            </div>

            {/* Deluxe Waxing Image Frame */}
            <div className="relative w-full aspect-[16/10] overflow-hidden border border-[#1A1008]/10 group-hover:border-[#C9995A]/30 transition-all duration-700 bg-[#FAF9F5] shadow-inner">
              <img 
                src="https://images.unsplash.com/photo-1519415510236-8aed79dd1555?auto=format&fit=crop&q=80&w=600&h=400"
                alt="Finest calming skin waxing"
                className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-[1200ms] opacity-90 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <span className="absolute bottom-2 left-2 text-[8px] font-mono tracking-widest text-[#1A1008]/70 uppercase px-2 py-0.5 bg-[#FAF9F5]/90 backdrop-blur-xs border border-[#1A1008]/10">
                Skin Curation
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-2xl font-light text-[#1A1008]">Facial Waxing</h3>
              <p className="text-xs text-[#1A1008]/70 leading-relaxed font-light">
                Delicate, soothing hard-wax curls customized for highly hyper-sensitive skin layers, with immediate soothing oil restoration.
              </p>
            </div>
          </div>

          {/* Organic leaf botanical lineart vector */}
          <div className="my-6 text-center flex justify-center py-2 relative">
            <svg viewBox="0 0 100 50" className="w-20 h-10 text-[#C9995A]/15 group-hover:text-[#C9995A]/40 transition-colors duration-500 stroke-[0.5] fill-none">
              <path d="M50 40 C65 25, 65 15, 50 10 C35 15, 35 25, 50 40 Z" stroke="currentColor"/>
              <path d="M50 40 L50 10" stroke="currentColor"/>
              <path d="M50 32 L60 25" stroke="currentColor"/>
              <path d="M50 24 L40 18" stroke="currentColor"/>
            </svg>
          </div>

          <div className="pt-6 border-t border-[#1A1008]/10 flex justify-between items-center text-xs">
            <span className="text-[#C9995A] font-bold">From $15</span>
            <button
              onClick={() => {
                setActiveCategory('waxing');
                const target = document.getElementById('price-panel');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[#C9995A] uppercase tracking-[0.15em] font-bold flex items-center space-x-1 hover:text-[#1A1008] transition-colors cursor-pointer"
            >
              <span>View catalog</span>
              <ChevronRight size={12} />
            </button>
          </div>
        </div>

      </div>

      {/* PRICE PANEL: Sincere-inspired high-fashion aesthetic price list menu layout */}
      <div id="price-panel" className="pt-12 scroll-mt-24">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#1A1008]/10">
          <div className="space-y-2">
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#C9995A] font-bold">TREATMENTS CATALOG</span>
            <h3 className="font-display text-3xl font-light text-[#1A1008]">Browse Pricing &amp; Durations</h3>
          </div>

          {/* Tab switches */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#FAF9F5] border border-[#1A1008]/10 p-1">
            {['all', 'lashes', 'brows', 'waxing'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-4 py-2 text-[9px] uppercase tracking-widest font-semibold font-sans transition-all duration-300 cursor-pointer ${
                  activeCategory === cat 
                    ? 'bg-[#C9995A] text-[#FAF9F5] border-transparent'
                    : 'text-[#1A1008]/60 hover:text-[#1A1008] hover:bg-[#1A1008]/5 border-transparent'
                }`}
                style={{ borderRadius: '0px' }}
              >
                {cat === 'all' ? 'All Treatment Options' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Rows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.map((service) => (
            <div 
              key={service.id}
              className="bg-white hover:bg-[#FAF9F5]/90 border border-[#1A1008]/5 p-6 flex flex-col sm:flex-row gap-6 justify-between transition-all duration-300 relative group overflow-hidden shadow-sm"
            >
              {/* Highlight bar if popular in golden accent */}
              {service.popular && (
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C9995A] to-transparent"></div>
              )}

              {/* Service image thumbnail preview */}
              {service.image && (
                <div className="w-full sm:w-28 h-40 sm:h-auto sm:aspect-square shrink-0 overflow-hidden border border-[#1A1008]/10 group-hover:border-[#C9995A]/30 transition-all duration-500 relative bg-[#FAF9F5] self-stretch">
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
              )}

              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex justify-between items-baseline mb-3">
                    <h4 className="font-display text-lg text-[#1A1008] font-light tracking-wide group-hover:text-[#C9995A] transition-colors flex flex-wrap gap-2 items-center text-left">
                      <span>{service.name}</span>
                      {service.popular && (
                        <span className="text-[8px] uppercase tracking-wider text-[#C9995A] bg-[#C9995A]/10 px-2.5 py-0.5 border border-[#C9995A]/20 font-sans font-semibold">
                          Most Booked
                        </span>
                      )}
                    </h4>
                    <span className="font-mono text-sm text-[#C9995A] font-bold shrink-0 ml-4">
                      ${service.price}
                    </span>
                  </div>
                  
                  <p className="text-[#1A1008]/70 text-xs font-light leading-relaxed mb-4 text-left">
                    {service.description}
                  </p>

                  {/* Benefits List */}
                  {service.benefits && service.benefits.length > 0 && (
                    <div className="flex flex-wrap gap-x-3 gap-y-1.5 mb-2">
                      {service.benefits.map((benefit, bIndex) => (
                        <span key={bIndex} className="text-[10px] text-[#1A1008]/50 flex items-center space-x-1.5 font-sans font-light">
                          <span className="w-1 h-1 bg-[#C9995A] rounded-full"></span>
                          <span>{benefit}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom footer bar on the individual cards */}
                <div className="pt-3 border-t border-[#1A1008]/5 flex justify-between items-center text-xs">
                  <span className="text-[#1A1008]/50 flex items-center space-x-1.5 font-mono text-[10px]">
                    <Clock size={11} className="text-[#C9995A]" />
                    <span>{service.duration} mins standard span</span>
                  </span>

                  <button
                    onClick={() => onBookService(service.id)}
                    className="text-[#C9995A] font-sans font-bold text-[10px] uppercase tracking-widest flex items-center space-x-1.5 transition-colors cursor-pointer hover:opacity-80"
                  >
                    <span>Select &amp; Booking</span>
                    <ChevronRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
