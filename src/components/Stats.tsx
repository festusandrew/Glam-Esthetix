/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, ShieldCheck, Heart, Award } from 'lucide-react';

export default function Stats() {
  const statItems = [
    { number: '500+', label: 'Clients served', desc: 'Bespoke precision designs', icon: Sparkles },
    { number: '5★', label: 'Yelp rating', desc: 'Top-tier local esthetician', icon: Heart },
    { number: '3+', label: 'Years in Pacifica', desc: 'Deep roots in the community', icon: Award },
    { number: '100%', label: 'Licensed & certified', desc: 'State board sanitation compliant', icon: ShieldCheck }
  ];

  return (
    <div className="w-full bg-[#FAF9F5] border-t border-b border-[#1A1008]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        
        {/* Modern Split Header: Editorial Call-out on Left, 4 Stats on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Philosophy Statement */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#C9995A] font-semibold">Brand core values</span>
            <h2 className="font-display text-3xl md:text-4xl font-extralight text-[#1A1008] leading-snug">
              Bespoke beauty <span className="italic text-[#C9995A]">precision</span> with absolute safety bounds.
            </h2>
            <p className="text-xs text-[#1A1008]/70 leading-relaxed font-light max-w-md">
              We focus on premium, individualized mapping for lash styling and brow geometry. Our Pacifica studio delivers luxurious result heights without ever compromising on your health.
            </p>
          </div>

          {/* Sincere-style bento box stats grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            {statItems.map((item, index) => (
              <div 
                key={index}
                className="bg-white border border-[#1A1008]/5 p-6 flex flex-col justify-between hover:border-[#C9995A]/30 transition-all duration-300 relative group overflow-hidden shadow-[0_4px_24px_rgba(26,16,10,0.02)]"
              >
                {/* Thin Vector Lineart Background ornament inside item box (referencing lineart guides) */}
                <div className="absolute right-3 top-3 text-[#C9995A]/5 group-hover:text-[#C9995A]/10 transition-colors pointer-events-none select-none">
                  <item.icon size={44} className="stroke-[1]" />
                </div>

                <div className="space-y-4">
                  <p className="font-display text-3xl md:text-4xl text-[#C9995A] font-extralight tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                    {item.number}
                  </p>
                  <div>
                    <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1A1008] font-bold">
                      {item.label}
                    </h4>
                    <p className="text-[10px] text-[#1A1008]/60 font-light mt-0.5">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
