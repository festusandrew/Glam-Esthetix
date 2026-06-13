/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Calendar } from 'lucide-react';
import { IMAGES } from '../data';

interface BookingBannerProps {
  onBannerActionClick: () => void;
}

export default function BookingBanner({ onBannerActionClick }: BookingBannerProps) {
  return (
    <div className="relative w-full bg-[#FAF9F5] border-y border-[#1A1008]/10 py-20 px-6 lg:px-12 overflow-hidden group">
      
      {/* Background Image Accent with Luxury Blending */}
      <div className="absolute inset-0 select-none pointer-events-none opacity-[0.05] scale-102 group-hover:scale-105 transition-transform duration-[4000ms] ease-out">
        <img 
          src={IMAGES.galleryVolume} 
          alt="Lash backdrop styling guide" 
          className="w-full h-full object-cover object-center filter grayscale"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Decorative vertical lines referencing coordinate boundaries */}
      <div className="absolute right-12 top-0 bottom-0 w-[0.5px] bg-[#C9995A]/15 hidden md:block"></div>
      <div className="absolute right-36 top-0 bottom-0 w-[0.5px] bg-[#C9995A]/10 hidden md:block"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
        
        {/* Left Side: Brand headlines */}
        <div className="space-y-3 text-left">
          <div className="flex items-center space-x-2">
            <Sparkles size={11} className="text-[#C9995A]" />
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#C9995A] font-semibold">ONLINE AVAILABILITY 24/7</span>
          </div>

          <h3 className="font-display text-4xl text-[#1A1008] font-extralight leading-tight">
            Ready to enhance your <span className="italic text-[#C9995A]">natural frame</span>?
          </h3>
          <p className="text-[#1A1008]/75 font-sans text-xs sm:text-sm font-light max-w-xl leading-relaxed">
            Instantly reserve classic extensions, structural brow tinting, or organic waxing in our Pacifica clinic. We'll curate the rest.
          </p>
        </div>

        {/* Right Side: Elegant Gold button styled with sharp edges */}
        <div className="flex-shrink-0 self-start md:self-center">
          <button
            onClick={onBannerActionClick}
            className="group flex items-center space-x-3 bg-[#C9995A] hover:bg-[#1A1008] text-[#FAF9F5] hover:text-[#C9995A] border border-transparent hover:border-[#C9995A] font-sans font-bold text-xs tracking-[0.2em] uppercase py-4.5 px-8 transition-all duration-300 ease-out active:scale-[0.98] select-none cursor-pointer"
            style={{ borderRadius: '0px' }}
          >
            <Calendar size={13} />
            <span>Book appointment</span>
          </button>
        </div>

      </div>
    </div>
  );
}
