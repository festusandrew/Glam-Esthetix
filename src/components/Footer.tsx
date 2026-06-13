/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-[#1A1008]/10 overflow-hidden relative">
      
      {/* Decorative vertical bounds */}
      <div className="absolute left-1/4 top-0 bottom-0 w-[0.5px] bg-[#1A1008]/5 hidden md:block select-none pointer-events-none"></div>
      <div className="absolute left-2/4 top-0 bottom-0 w-[0.5px] bg-[#1A1008]/5 hidden md:block select-none pointer-events-none"></div>
      <div className="absolute left-3/4 top-0 bottom-0 w-[0.5px] bg-[#1A1008]/5 hidden md:block select-none pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          
          {/* Logo Brand left */}
          <div className="md:col-span-4 space-y-4 text-center md:text-left flex flex-col items-center md:items-start">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer hover:opacity-90 transition-opacity focus:outline-none"
            >
              <Logo className="w-auto h-12" showText={true} lightBackground={true} horizontal={true} />
            </button>
            <p className="font-mono text-[8.5px] uppercase tracking-widest text-[#1A1008]/40">
              Esthetician Clinic &copy; {currentYear} &mdash; All Rights Reserved.
            </p>
          </div>

          {/* Directory navigation items center */}
          <div className="md:col-span-4 flex justify-center space-x-10 text-[9.5px] uppercase tracking-[0.2em] text-[#1A1008]/50 font-bold font-sans">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="hover:text-[#C9995A] transition-colors cursor-pointer"
            >
              Top
            </button>
            <button 
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} 
              className="hover:text-[#C9995A] transition-colors cursor-pointer"
            >
              Treatments
            </button>
            <button 
              onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })} 
              className="hover:text-[#C9995A] transition-colors cursor-pointer"
            >
              Gallery
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
              className="hover:text-[#C9995A] transition-colors cursor-pointer"
            >
              Inquire
            </button>
          </div>

          {/* Socials & coordinates right */}
          <div className="md:col-span-4 text-center md:text-right space-y-1.5 text-xs font-sans text-[#1A1008]/60 font-light tracking-wide shrink-0">
            <p>
              Pacifica, CA &middot; Private Appointments Only
            </p>
            <p className="text-[#C9995A] font-medium uppercase tracking-[0.12em] font-mono text-[9px] flex items-center justify-center md:justify-end space-x-2">
              <a href="https://instagram.com/glam.esthetix" target="_blank" rel="noopener noreferrer" className="hover:text-[#1A1008] transition-colors font-bold">@glam.esthetix</a>
              <span>&middot;</span>
              <a href="mailto:info@glamesthetix.com" className="hover:text-[#1A1008] transition-colors font-bold">info@glamesthetix.com</a>
            </p>
          </div>

        </div>

        {/* Backdrop faint watermark text running across footer width */}
        <div className="mt-12 select-none pointer-events-none opacity-[0.025] text-[7vw] font-display font-light uppercase tracking-[0.3em] text-[#1A1008] text-center whitespace-nowrap leading-none pt-4">
          beauty precision pacifica
        </div>

      </div>
    </footer>
  );
}
