/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Sparkles, CheckCircle, Shield, Award, Users } from 'lucide-react';
import { IMAGES } from '../data';

interface HeroProps {
  onBookClick: (preselectedServiceId?: string) => void;
  onViewServicesClick: () => void;
}

export default function Hero({ onBookClick, onViewServicesClick }: HeroProps) {
  return (
    <section className="relative pt-[120px] pb-24 md:pt-[160px] md:pb-32 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
      
      {/* Editorial Watermark Backdrop - "glam" in enormous luxury typeface */}
      <div className="absolute left-[5%] top-[10%] select-none pointer-events-none opacity-[0.03] text-[20vw] font-display font-light uppercase tracking-[0.2em] text-[#C9995A] leading-none whitespace-nowrap">
        glam
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Column: Architectural Editorial Text & Retention stats */}
        <div className="lg:col-span-6 flex flex-col space-y-10">
          
          <div className="space-y-6">
            {/* Elegant upper eyebrow */}
            <div className="flex items-center space-x-3">
              <span className="w-8 h-[0.5px] bg-[#C9995A]"></span>
              <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#C9995A] font-semibold">
                Pacifica · Bay Area, CA
              </p>
            </div>
            {/* High-fashion display H1 */}
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extralight text-[#1A1008] leading-[1.05] tracking-tight relative">
              Lashes that <br />
              <span className="italic font-medium text-[#C9995A] serif-font-custom">speak</span> for <br />
              themselves.
            </h1>

            {/* Subheading */}
            <p className="text-[#1A1008]/80 font-sans text-xs sm:text-sm md:text-base font-light max-w-lg leading-relaxed pt-2">
              Bespoke lash extensions, precision brow framing, and clean organic waxing curated for modern routines. Experience Pacifica's premier, state-licensed beauty clinic.
            </p>
          </div>

          {/* Sincere-inspired Client Experience Micro-Banner */}
          <div className="flex items-center space-x-6 py-4 border-y border-[#1A1008]/10 max-w-md">
            <div>
              <p className="font-display text-4xl text-[#C9995A] font-light tracking-tight">99.9%</p>
              <p className="font-sans text-[9px] uppercase tracking-widest text-[#1A1008]/50 font-semibold mt-1">Client Retention</p>
            </div>
            
            <div className="h-10 w-[0.5px] bg-[#1A1008]/10"></div>

            {/* Overlapping client bubble list - high end aesthetic */}
            <div className="flex flex-col space-y-1.5 justify-center">
              <div className="flex -space-x-2.5">
                {[
                  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120",
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120",
                  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120&h=120",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Pleased client portrait"
                    className="w-7 h-7 rounded-full border border-[#FAF9F5] object-cover"
                    referrerPolicy="no-referrer"
                  />
                ))}
                <div className="w-7 h-7 rounded-full bg-[#C9995A] border border-[#FAF9F5] flex items-center justify-center text-[9px] text-[#FAF9F5] font-bold">
                  +3k
                </div>
              </div>
              <p className="text-[10px] font-light text-[#1A1008]/65">Loved by modern Bay Area patrons</p>
            </div>
          </div>

          {/* Action Blocks */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              onClick={() => onBookClick()}
              className="bg-[#C9995A] hover:bg-[#1A1008] text-[#FAF9F5] hover:text-[#C9995A] font-sans font-semibold text-xs tracking-[0.2em] uppercase py-4.5 px-8 border border-transparent hover:border-[#C9995A] transition-all duration-300 ease-out select-none active:scale-[0.98] text-center cursor-pointer font-bold"
              style={{ borderRadius: '0px' }}
            >
              Book Private Session
            </button>
            
            <button
              onClick={onViewServicesClick}
              className="group flex items-center justify-center space-x-2 text-[#1A1008] hover:text-[#FAF9F5] hover:bg-[#1A1008] font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 py-4.5 px-6 border border-[#1A1008]/20 hover:border-transparent cursor-pointer font-bold"
              style={{ borderRadius: '0px' }}
            >
              <span>Explore Treatments</span>
              <ArrowRight size={12} className="transform group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

        </div>

        {/* Right Column: Premium High-contrast Editorial Hero Capture with asymmetric floating price tags */}
        <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
          
          {/* Main Portrait Frame - modern editorial scale */}
          <div className="relative w-full max-w-[440px] aspect-[4/5] bg-white border border-[#1A1008]/10 p-2.5 shadow-2xl overflow-hidden group">
            
            <img 
              src={IMAGES.lashHero}
              alt="Sophisticated Eyelashes extensions styling"
              className="w-full h-full object-cover object-center scale-102 group-hover:scale-105 transition-transform duration-[2000ms] ease-out opacity-95"
              referrerPolicy="no-referrer"
            />
            
            {/* Subtle elegant gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1008]/60 via-[#1A1008]/5 to-transparent opacity-40"></div>



            {/* Micro badge top right */}
            <span className="absolute top-6 right-6 font-mono text-[9px] text-[#FAF9F5] uppercase tracking-widest bg-[#1A1008]/90 backdrop-blur-sm border border-white/10 px-3 py-1.5">
              Available 24/7
            </span>
          </div>

          {/* Underlay subtle geometric gold outline ornament referencing 'sincere' frame outlines */}
          <div className="absolute -bottom-6 -left-6 w-44 h-44 border-b border-l border-[#C9995A]/25 select-none pointer-events-none hidden md:block"></div>
        </div>

      </div>
    </section>
  );
}
