/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Star, MessageSquareCode, Check, Send, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { INITIAL_TESTIMONIALS } from '../data';
import { Testimonial } from '../types';

export default function Testimonials() {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [newQuote, setNewQuote] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newSource, setNewSource] = useState('Google Review');
  const [newRating, setNewRating] = useState(5);
  const [successMsg, setSuccessMsg] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const { scrollLeft } = target;
    const children = Array.from(target.children) as HTMLElement[];
    if (children.length === 0) return;

    let closestIndex = 0;
    let minDifference = Infinity;

    children.forEach((child, idx) => {
      const diff = Math.abs((child.offsetLeft - target.offsetLeft) - scrollLeft);
      if (diff < minDifference) {
        minDifference = diff;
        closestIndex = idx;
      }
    });

    setActiveIndex(closestIndex);
  };

  const scrollToCard = (idx: number) => {
    if (scrollRef.current) {
      const children = Array.from(scrollRef.current.children) as HTMLElement[];
      if (children && children[idx]) {
        const child = children[idx];
        scrollRef.current.scrollTo({
          left: child.offsetLeft - scrollRef.current.offsetLeft,
          behavior: 'smooth'
        });
        setActiveIndex(idx);
      }
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('glam_reviews');
    if (saved) {
      try {
        setReviews(JSON.parse(saved));
      } catch (e) {
        setReviews(INITIAL_TESTIMONIALS);
      }
    } else {
      setReviews(INITIAL_TESTIMONIALS);
    }
  }, []);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuote.trim() || !newAuthor.trim()) return;

    const newReview: Testimonial = {
      id: `saved-rev-${Date.now()}`,
      rating: newRating,
      quote: newQuote.trim(),
      author: newAuthor.trim(),
      source: newSource,
      date: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short' })
    };

    const updated = [...reviews, newReview];
    setReviews(updated);
    localStorage.setItem('glam_reviews', JSON.stringify(updated));

    // Reset Form
    setNewQuote('');
    setNewAuthor('');
    setNewRating(5);
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setIsFormOpen(false);
    }, 3500);
  };

  return (
    <section id="testimonials" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-b border-[#1A1008]/10">
      
      {/* Sincere-inspired Split Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="space-y-3 text-left">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#C9995A] font-semibold">
            PATRON VOICES
          </p>
          <h2 className="font-display text-4xl font-extralight text-[#1A1008] tracking-tight">
            Client Testimonials
          </h2>
          <p className="text-xs text-[#1A1008]/70 font-light max-w-md leading-relaxed">
            Real stories from verified Pacifica patrons who prioritize eye health and high-fashion precision.
          </p>
        </div>

        {/* Call to action & scroll controls */}
        <div className="flex flex-wrap items-center gap-4 self-start md:self-end">
          {/* Scroll Navigation Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                if (scrollRef.current) {
                  const cardEl = scrollRef.current.firstElementChild as HTMLElement;
                  const cardWidth = cardEl ? cardEl.offsetWidth + 24 : 350;
                  scrollRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
                }
              }}
              className="w-11 h-11 border border-[#1A1008]/10 hover:border-[#C9995A]/40 flex items-center justify-center text-[#1A1008]/80 hover:text-[#C9995A] transition-colors bg-[#1A1008]/5 cursor-pointer animate-none"
              aria-label="Previous reviews"
              style={{ borderRadius: '0px' }}
            >
              <ArrowLeft size={15} />
            </button>
            <button
              onClick={() => {
                if (scrollRef.current) {
                  const cardEl = scrollRef.current.firstElementChild as HTMLElement;
                  const cardWidth = cardEl ? cardEl.offsetWidth + 24 : 350;
                  scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
                }
              }}
              className="w-11 h-11 border border-[#1A1008]/10 hover:border-[#C9995A]/40 flex items-center justify-center text-[#1A1008]/80 hover:text-[#C9995A] transition-colors bg-[#1A1008]/5 cursor-pointer animate-none"
              aria-label="Next reviews"
              style={{ borderRadius: '0px' }}
            >
              <ArrowRight size={15} />
            </button>
          </div>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="border border-[#C9995A]/30 hover:border-[#C9995A] text-[#C9995A] hover:text-[#1A1008] hover:bg-[#FAF9F5] font-sans text-[10px] uppercase tracking-widest px-6 py-3.5 transition-all bg-[#FAF9F5] cursor-pointer font-bold h-11 flex items-center"
            style={{ borderRadius: '0px' }}
          >
            {isFormOpen ? 'Close Review Form' : 'Write a Review'}
          </button>
        </div>
      </div>

      {/* Review Submission Area */}
      {isFormOpen && (
        <div className="mb-16 max-w-2xl mx-auto bg-white border border-[#C9995A]/40 p-8 relative animate-fade-in shadow-lg">
          
          {successMsg ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 rounded-full border border-[#C9995A] flex items-center justify-center mx-auto text-[#C9995A]">
                <Check size={18} />
              </div>
              <h3 className="font-display text-2xl text-[#1A1008] font-light">Testimonial Published</h3>
              <p className="text-xs text-[#1A1008]/65 max-w-md mx-auto">
                Thank you! Your feedback has been stored locally and added to our scrolling showcase stack.
              </p>
            </div>
          ) : (
            <form onSubmit={handleAddReview} className="space-y-6 text-left">
              <div className="space-y-1">
                <h3 className="font-display text-xl text-[#1A1008] font-light">Share your Glam Esthetix experience</h3>
                <p className="text-[11px] text-[#1A1008]/40 font-semibold">Your name and service review will appear in our public list immediately.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-widest text-[#1A1008]/60 font-semibold">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Sarah K."
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full bg-[#FAF9F5] border border-[#1A1008]/15 p-3 px-4 text-xs font-light text-[#1A1008] focus:border-[#C9995A] focus:outline-none"
                    style={{ borderRadius: '0px' }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-widest text-[#1A1008]/60 font-semibold">Platform Source</label>
                  <select
                    value={newSource}
                    onChange={(e) => setNewSource(e.target.value)}
                    className="w-full bg-[#FAF9F5] border border-[#1A1008]/15 p-3 px-4 text-xs font-light text-[#1A1008] focus:border-[#C9995A] focus:outline-none"
                    style={{ borderRadius: '0px' }}
                  >
                    <option value="Google Review text-slate-800">Google Review</option>
                    <option value="Yelp Client text-slate-800">Yelp Verified</option>
                    <option value="Direct Review text-slate-800">Direct Patron</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="block text-[10px] uppercase tracking-widest text-[#1A1008]/60 font-semibold">Star Rating</label>
                  <span className="text-[10px] text-[#C9995A] font-bold">{newRating} of 5 Stars</span>
                </div>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((stars) => (
                    <button
                      key={stars}
                      type="button"
                      onClick={() => setNewRating(stars)}
                      className="p-1 text-[#1A1008]/30 hover:text-[#C9995A] transition-colors cursor-pointer"
                    >
                      <Star size={18} className={`${stars <= newRating ? 'text-[#C9995A] fill-[#C9995A]' : 'text-transparent stroke-[#1A1008]/35'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-widest text-[#1A1008]/60 font-semibold">Testimonial Note</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us about your lash set, fill retention, or customized brow mapping..."
                  value={newQuote}
                  onChange={(e) => setNewQuote(e.target.value)}
                  className="w-full bg-[#FAF9F5] border border-[#1A1008]/15 p-3 px-4 text-xs font-light text-[#1A1008] focus:border-[#C9995A] focus:outline-none resize-none"
                  style={{ borderRadius: '0px' }}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#C9995A] hover:bg-[#1A1008] text-[#FAF9F5] hover:text-[#C9995A] border border-transparent hover:border-[#C9995A] font-sans font-bold text-xs tracking-widest uppercase py-3.5 transition-colors cursor-pointer flex items-center justify-center space-x-2"
                style={{ borderRadius: '0px' }}
              >
                <span>Publish Testimonial</span>
                <Send size={11} />
              </button>
            </form>
          )}

        </div>
      )}

      {/* Core Testimony Cards Scrolling Carousel */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((rev) => (
          <div 
            key={rev.id}
            className="w-full sm:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] shrink-0 snap-start p-8 lg:p-10 bg-white border border-[#1A1008]/5 relative flex flex-col justify-between overflow-hidden group hover:border-[#C9995A]/35 transition-all duration-300 shadow-sm"
          >
            {/* Huge faint decorative quotation mark back-drop */}
            <span className="absolute -right-2 -top-6 text-[#C9995A]/10 font-display text-[12rem] select-none pointer-events-none leading-none">
              “
            </span>

            <div className="space-y-6 relative z-10 text-left">
              {/* Star block */}
              <div className="flex items-center space-x-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={11} 
                    className={`${
                      i < rev.rating 
                        ? 'text-[#C9995A] fill-[#C9995A]' 
                        : 'text-transparent stroke-[#1A1008]/20'
                    }`} 
                  />
                ))}
              </div>

              {/* Italic Cormorant Garamond Quote */}
              <p className="font-display text-lg sm:text-xl font-light text-[#1A1008] italic leading-relaxed min-h-[90px] flex items-center">
                &ldquo;{rev.quote}&rdquo;
              </p>
            </div>

            {/* Uppercase Small Attribution info */}
            <div className="mt-8 pt-6 border-t border-[#1A1008]/10 flex justify-between items-center relative z-10">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9995A]/40"></span>
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1A1008]/70 font-bold truncate max-w-[130px]">
                  {rev.author}
                </span>
              </div>
              <span className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-[#C9995A] px-3 py-1 border border-[#C9995A]/15 bg-[#C9995A]/5 shrink-0 font-bold">
                {rev.source}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel navigation indicators (dots) at the bottom */}
      <div className="flex justify-center items-center space-x-2.5 mt-8">
        {reviews.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToCard(idx)}
            className={`h-1 transition-all duration-300 cursor-pointer ${
              idx === activeIndex 
                ? 'w-6 bg-[#C9995A]' 
                : 'w-2 bg-[#1A1008]/15 hover:bg-[#1A1008]/35'
            }`}
            aria-label={`Go to testimonial ${idx + 1}`}
            style={{ borderRadius: '0px' }}
          />
        ))}
      </div>

    </section>
  );
}
