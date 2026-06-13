/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  onBookClick: () => void;
}

export default function Navbar({ onBookClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of the navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav 
      id="top-navbar"
      className="fixed top-0 left-0 w-full z-50 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#1A1008]/10 h-20 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto h-full px-6 lg:px-12 flex justify-between items-center">
        {/* Logo Left with Eye Art & Typography */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center cursor-pointer hover:opacity-90 transition-opacity"
        >
          <Logo className="w-auto h-12" showText={true} lightBackground={true} horizontal={true} />
        </button>

        {/* Center Links (hidden on mobile) */}
        <div className="hidden md:flex items-center space-x-8">
          {[
            { label: 'Services Catalog', target: 'services' },
            { label: 'Gallery', target: 'gallery' },
            { label: 'Philosophy', target: 'about' },
            { label: 'Reviews', target: 'testimonials' },
            { label: 'Gift Cards', target: 'giftcards' },
            { label: 'Contact', target: 'contact' },
          ].map((link) => (
            <button
              key={link.target}
              onClick={() => handleScroll(link.target)}
              className="text-[10px] uppercase tracking-[0.22em] text-[#1A1008]/70 hover:text-[#C9995A] transition-colors cursor-pointer font-bold relative group/nav"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-1.5 left-0 w-0 h-[0.5px] bg-[#C9995A] group-hover/nav:w-full transition-all duration-300"></span>
            </button>
          ))}
        </div>

        {/* Right Book Now Button (hidden on narrow devices, visible on md+) */}
        <div className="hidden md:block">
          <button
            onClick={onBookClick}
            className="bg-[#C9995A] hover:bg-[#1A1008] text-[#FAF9F5] hover:text-[#C9995A] font-sans font-bold text-xs tracking-[0.18em] uppercase py-3.5 px-7 border border-transparent hover:border-[#C9995A] transition-all duration-300 ease-out active:scale-[0.98] select-none cursor-pointer"
            style={{ borderRadius: '0px' }}
          >
            Book Session
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#1A1008] hover:text-[#C9995A] transition-colors p-2 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (dropdown) */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#FAF9F5]/98 border-b border-[#1A1008]/10 px-6 py-8 flex flex-col space-y-6 items-center animate-fade-in shadow-2xl">
          {[
            { label: 'Services Catalog', target: 'services' },
            { label: 'Gallery', target: 'gallery' },
            { label: 'Philosophy', target: 'about' },
            { label: 'Reviews', target: 'testimonials' },
            { label: 'Gift Cards', target: 'giftcards' },
            { label: 'Contact', target: 'contact' },
          ].map((link) => (
            <button
              key={link.target}
              onClick={() => handleScroll(link.target)}
              className="text-[10px] uppercase tracking-[0.2em] text-[#1A1008]/80 hover:text-[#C9995A]"
            >
              <strong>{link.label}</strong>
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onBookClick();
            }}
            className="bg-[#C9995A] text-[#FAF9F5] hover:bg-[#1A1008] font-sans font-bold text-xs tracking-[0.2em] uppercase py-4 w-full text-center transition-colors mt-2 cursor-pointer"
            style={{ borderRadius: '0px' }}
          >
            Book Session
          </button>
        </div>
      )}
    </nav>
  );
}
