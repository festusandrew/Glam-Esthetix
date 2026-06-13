/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Eye, X, ZoomIn, Heart, Sparkles, SlidersHorizontal } from 'lucide-react';
import { IMAGES } from '../data';

interface GalleryItem {
  id: string;
  label: string;
  image: string;
  category: 'lashes' | 'brows';
  gridClass: string; // for custom placement
  aspectDesc: string;
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'lashes' | 'brows'>('all');

  const galleryItems: GalleryItem[] = [
    {
      id: 'vol-set',
      label: 'Volume Lash Set',
      image: IMAGES.galleryVolume,
      category: 'lashes',
      gridClass: 'md:col-span-2 md:row-span-2 h-[450px]',
      aspectDesc: 'High density fan mapping (Volume 4D-6D), crafted to give ultra-full shadows while protecting natural lash follicles.'
    },
    {
      id: 'brow-shape',
      label: 'Sculpted Brow Shape',
      image: IMAGES.galleryBrowShape,
      category: 'brows',
      gridClass: 'h-[218px]',
      aspectDesc: 'Symmetrical facial mapping followed by wax precision and calming conditioning skin oils.'
    },
    {
      id: 'classic-set',
      label: 'Classic Lash Extension',
      image: IMAGES.galleryClassicSet,
      category: 'lashes',
      gridClass: 'h-[218px]',
      aspectDesc: 'Clean 1:1 lash mapping using synthetic premium faux-mink fiber extensions, natural elevation.'
    },
    {
      id: 'hybrid-set',
      label: 'Textured Hybrid Lashes',
      image: IMAGES.galleryHybridSet,
      category: 'lashes',
      gridClass: 'h-[218px]',
      aspectDesc: 'Rich blend of standard classic extensions interwoven with lightweight volume fan extensions.'
    },
    {
      id: 'brow-tint',
      label: 'Brow Tint & Definition',
      image: IMAGES.galleryBrowTint,
      category: 'brows',
      gridClass: 'h-[218px]',
      aspectDesc: 'Semi-permanent botanical definition dye, formulated safely, customized to client skin and hair undertones.'
    }
  ];

  const filteredItems = galleryItems.filter(item => 
    filter === 'all' ? true : item.category === filter
  );

  return (
    <section id="gallery" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-b border-[#1A1008]/10">
      
      {/* Sincere-inspired Split Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="space-y-3 text-left">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#C9995A] font-semibold">
            CLIENT SHOWCASE
          </p>
          <h2 className="font-display text-4xl font-extralight text-[#1A1008] tracking-tight">
            The Gallery
          </h2>
          <p className="text-xs text-[#1A1008]/70 font-light max-w-md leading-relaxed">
            Unretouched snapshots of our lashes and brows treatments, capturing the true precision and lash health standards of Glam Esthetix.
          </p>
        </div>

        {/* Filter Pill List */}
        <div className="flex items-center space-x-1 border border-[#1A1008]/10 p-1 self-start bg-[#FAF9F5]">
          <span className="p-2 text-[#C9995A] hidden sm:inline-block">
            <SlidersHorizontal size={12} />
          </span>

          {['all', 'lashes', 'brows'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-4 py-2 text-[9px] uppercase tracking-widest font-semibold font-sans transition-all duration-300 cursor-pointer ${
                filter === cat 
                  ? 'bg-[#C9995A] text-[#FAF9F5]'
                  : 'text-[#1A1008]/60 hover:text-[#1A1008] hover:bg-[#1A1008]/5'
              }`}
              style={{ borderRadius: '0px' }}
            >
              {cat === 'all' ? 'All Looks' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetric Core Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item)}
            className={`relative bg-[#FAF9F5] overflow-hidden group cursor-pointer border border-[#1A1008]/5 hover:border-[#C9995A]/45 transition-all duration-500 flex flex-col justify-end ${item.gridClass}`}
          >
            {/* Background cover image */}
            <img
              src={item.image}
              alt={item.label}
              className="absolute inset-0 w-full h-full object-cover object-center opacity-90 group-hover:opacity-95 group-hover:scale-104 transition-all duration-[2000ms] ease-out-quad"
              referrerPolicy="no-referrer"
            />

            {/* Dark subtle overlay vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500"></div>

            {/* Centered Luxury Zoom Icon Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 pointer-events-none">
              <div className="w-12 h-12 bg-[#FAF9F5]/95 border border-[#C9995A]/30 flex items-center justify-center text-[#C9995A] shadow-2xl">
                <ZoomIn size={16} />
              </div>
            </div>

            {/* Bottom Brand-Style Labels */}
            <div className="relative z-10 p-5 space-y-1 transform group-hover:translate-x-1 transition-transform duration-300 text-left">
              <span className="font-mono text-[8.5px] uppercase tracking-widest text-[#C9995A] font-semibold">{item.category}</span>
              <p className="text-sm font-display uppercase tracking-widest font-light text-[#FAF9F5]">
                {item.label}
              </p>
            </div>

            {/* Top right corner diagonal catalog indicators */}
            <div className="absolute top-4 right-4 font-mono text-[8px] text-[#FAF9F5]/40 uppercase tracking-widest group-hover:text-[#FAF9F5]/80 transition-colors">
              // NO_FILTER
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-[#1A1008]/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="bg-[#FAF9F5] border border-[#C9995A] w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto flex flex-col md:flex-row relative shadow-2xl"
            style={{ borderRadius: '0px' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 border border-[#1A1008]/10 hover:border-[#C9995A] text-[#1A1008] bg-[#FAF9F5]/90 flex items-center justify-center transition-colors focus:outline-none cursor-pointer"
              style={{ borderRadius: '0px' }}
            >
              <X size={16} />
            </button>

            {/* Lightbox Image Left */}
            <div className="w-full md:w-3/5 bg-black h-[320px] md:h-auto min-h-[300px] relative">
              <img 
                src={selectedImage.image} 
                alt={selectedImage.label}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Lightbox Information Right */}
            <div className="w-full md:w-2/5 p-8 flex flex-col justify-between text-left">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9995A] font-semibold block">Glam Esthetix Gallery</span>
                  <h4 className="font-display text-3xl font-light text-[#1A1008] tracking-tight">{selectedImage.label}</h4>
                </div>

                <div className="h-[0.5px] bg-[#C9995A]/30"></div>

                <div className="space-y-4">
                  <p className="text-xs text-[#1A1008]/85 font-light leading-relaxed">
                    {selectedImage.aspectDesc}
                  </p>
                  <p className="text-xs text-[#1A1008]/65 font-light leading-relaxed">
                    All treatments are customized in our Pacifica clinic using hospital-level sanitation standards and medical-grade adhesive.
                  </p>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-[#1A1008]/10 flex flex-col space-y-4">
                <div className="flex items-center space-x-2 text-xs text-[#1A1008]/60 font-light">
                  <Heart size={12} className="text-[#C9995A] fill-[#C9995A]" />
                  <span>Licensed Pacifica Clinic</span>
                </div>
                
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    // attempt to preselect the core service
                    const serviceMap: { [key: string]: string } = {
                      'Volume Lash Set': 'lash-volume',
                      'Sculpted Brow Shape': 'brow-shape-tint',
                      'Classic Lash Extension': 'lash-classic',
                      'Textured Hybrid Lashes': 'lash-hybrid',
                      'Brow Tint & Definition': 'brow-shape-tint'
                    };
                    const targetId = serviceMap[selectedImage.label] || '';
                    
                    const bookingSection = document.getElementById('booking-anchor');
                    if (bookingSection) {
                      bookingSection.scrollIntoView({ behavior: 'smooth' });
                      
                      // dispatch select trigger
                      if (targetId) {
                        setTimeout(() => {
                          const triggerBtn = document.getElementById(`select-service-trigger-${targetId}`);
                          if (triggerBtn) {
                            (triggerBtn as HTMLButtonElement).click();
                          }
                        }, 400);
                      }
                    }
                  }}
                  className="w-full bg-[#C9995A] hover:bg-[#1A1008] text-[#FAF9F5] hover:text-[#C9995A] border border-transparent hover:border-[#C9995A] font-sans font-bold text-xs tracking-[0.18em] uppercase py-3.5 transition-colors duration-300 cursor-pointer"
                  style={{ borderRadius: '0px' }}
                >
                  Book This Style
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
