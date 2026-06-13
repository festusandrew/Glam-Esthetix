/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Instagram, MapPin, Send, CheckCircle2, Award, ClipboardCheck, Sparkles, BookOpen } from 'lucide-react';
import { IMAGES } from '../data';

export default function AboutContact() {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) return;

    // Simulate sending an inquiry
    setIsSuccess(true);
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setIsSuccess(false);
    }, 4000);
  };

  return (
    <div className="bg-white border-b border-[#1A1008]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 space-y-32">
        
        {/* ABOUT SEGMENT - Id matches navbar */}
        <div id="about" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center scroll-mt-24">
          
          {/* Column 1: Image Frame - Inspired by 'sincëre' overlay layout */}
          <div className="lg:col-span-5 relative">
            <div className="w-full h-[460px] bg-[#FAF9F5] border border-[#1A1008]/10 p-2.5 overflow-hidden relative group">
              <img 
                src={IMAGES.jasmine}
                alt="Jasmine - Licensed Esthetician &amp; Owner"
                className="w-full h-full object-cover object-center scale-102 group-hover:scale-105 transition-transform duration-[2500ms] opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1008]/40 via-transparent to-transparent opacity-40"></div>
            </div>
            
            {/* Owner Signature Floating Block */}
            <div className="absolute -bottom-6 -right-4 bg-[#C9995A] text-[#FAF9F5] p-5 py-6 max-w-[240px] shadow-2xl">
              <p className="font-display text-[19px] leading-tight font-semibold text-[#1A1008] tracking-wide mb-1 select-none">
                Jasmine
              </p>
              <p className="font-sans text-[8.5px] uppercase tracking-widest text-[#1A1008]/80 font-bold">
                Licensed Esthetician &amp; Owner
              </p>
            </div>
          </div>

          {/* Column 2: Narrative details */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-3">
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#C9995A] font-semibold block">
                MEET THE ESTHETICIAN
              </span>
              <h3 className="font-display text-4xl font-extralight text-[#1A1008] tracking-tight leading-tight">
                Studio Precision in Pacifica
              </h3>
            </div>
            
            <div className="h-[0.5px] bg-[#C9995A]/30 w-32"></div>

            <div className="space-y-5 text-xs sm:text-sm font-light text-[#1A1008]/75 leading-relaxed font-sans">
              <p>
                Hi everyone 👋 I’m Jasmine, the owner and licensed esthetician behind Glam Esthetix ✨
              </p>
              <p>
                My journey in the beauty industry began in 2020, and what started with a lash course has grown into a passion for enhancing natural beauty through continued education, experience, and specialized services. As a mom and business owner, I take pride in creating a space where every client feels comfortable, confident, and cared for.
              </p>
              <p>
                I’m so grateful for the opportunity to help you feel confident and beautiful and look forward to seeing you in the studio soon 🤍
              </p>
            </div>
          </div>

        </div>

        {/* CONTACT SEGMENT - Id matches navbar */}
        <div id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 scroll-mt-24">
          
          {/* Column 1: Get in touch, details, channels (Left 5 Columns) */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-3">
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#C9995A] font-semibold block">
                GET IN TOUCH
              </span>
              <h3 className="font-display text-4xl font-extralight text-[#1A1008] tracking-tight">
                Connect Directly
              </h3>
              <p className="text-xs text-[#1A1008]/70 font-light max-w-sm leading-relaxed">
                Have questions regarding lash curl retention, facial wax types, or custom group scheduling? Shoot us a message or find us on Instagram.
              </p>
            </div>

            <div className="space-y-5 font-sans text-xs">
              
              {/* Location */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 border border-[#1A1008]/10 flex items-center justify-center text-[#C9995A] bg-[#1A1008]/5 shrink-0">
                  <MapPin size={13} />
                </div>
                <div>
                  <p className="uppercase tracking-widest text-[8px] text-[#1A1008]/40 font-bold font-mono">Pacifica Studio</p>
                  <p className="text-[#1A1008]/85 font-semibold">Pacifica, Bay Area, California</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 border border-[#1A1008]/10 flex items-center justify-center text-[#C9995A] bg-[#1A1008]/5 shrink-0">
                  <Mail size={13} />
                </div>
                <div>
                  <p className="uppercase tracking-widest text-[8px] text-[#1A1008]/40 font-bold font-mono">Direct Email</p>
                  <a href="mailto:info@glamesthetix.com" className="text-[#C9995A] hover:text-[#1A1008] font-bold transition-colors font-mono">
                    info@glamesthetix.com
                  </a>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 border border-[#1A1008]/10 flex items-center justify-center text-[#C9995A] bg-[#1A1008]/5 shrink-0">
                  <Instagram size={13} />
                </div>
                <div>
                  <p className="uppercase tracking-widest text-[8px] text-[#1A1008]/40 font-bold font-mono">Instagram Showcase</p>
                  <a href="https://instagram.com/glam.esthetix" target="_blank" rel="noopener noreferrer" className="text-[#C9995A] hover:text-[#1A1008] font-bold transition-colors font-mono">
                    @glam.esthetix
                  </a>
                </div>
              </div>

            </div>

            <p className="text-[9.5px] uppercase tracking-widest text-[#1A1008]/30 font-light font-mono leading-relaxed max-w-xs block pt-4">
              // TREATMENTS PERFORMED STRICTLY BY APPOINTMENT ONLY. APPLICABLE FOR PATRONS FROM PACIFICA &amp; SAN FRANCISCO BAY AREAS.
            </p>
          </div>

          {/* Column 2: Digital Inquiry Form (Right 7 Col) */}
          <div className="lg:col-span-7 bg-white border border-[#1A1008]/10 p-8 md:p-10 shadow-sm text-left">
            {isSuccess ? (
              <div className="p-8 text-center space-y-4 animate-fade-in py-16">
                <div className="w-12 h-12 bg-[#C9995A]/10 border border-[#C9995A] rounded-full flex items-center justify-center mx-auto text-[#C9995A]">
                  <CheckCircle2 size={18} />
                </div>
                <h4 className="font-display text-2xl font-light text-[#1A1008]">Message Sent</h4>
                <p className="text-xs text-[#1A1008]/70 max-w-sm mx-auto leading-relaxed">
                  Thank you! Jasmine will review your question personally and get back to you within 24 business hours at your designated email address.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitContact} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="block text-[10px] uppercase tracking-[0.18em] text-[#1A1008]/70 font-bold font-sans">Your Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Elena Gilbert"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-[#FAF9F5] border border-[#1A1008]/15 p-3.5 px-4 text-xs font-light text-[#1A1008] placeholder-[#1A1008]/30 focus:outline-none focus:border-[#C9995A] transition-colors font-sans"
                      style={{ borderRadius: '0px' }}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="block text-[10px] uppercase tracking-[0.18em] text-[#1A1008]/70 font-bold font-sans">Email Address</label>
                    <input
                      id="contact-email"
                      type="text"
                      required
                      placeholder="e.g. elena@gmail.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-[#FAF9F5] border border-[#1A1008]/15 p-3.5 px-4 text-xs font-light text-[#1A1008] placeholder-[#1A1008]/30 focus:outline-none focus:border-[#C9995A] transition-colors font-sans"
                      style={{ borderRadius: '0px' }}
                    />
                  </div>

                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="block text-[10px] uppercase tracking-[0.18em] text-[#1A1008]/70 font-bold font-sans">Your Message / Question</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Ask us anything about lamination curl holds, classic vs hybrid sets, or timing rules..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full bg-[#FAF9F5] border border-[#1A1008]/15 p-3.5 px-4 text-xs font-light text-[#1A1008] placeholder-[#1A1008]/30 focus:outline-none focus:border-[#C9995A] transition-colors resize-none font-sans"
                    style={{ borderRadius: '0px' }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C9995A] hover:bg-[#1A1008] text-[#FAF9F5] hover:text-[#C9995A] border border-transparent hover:border-[#C9995A] font-sans font-bold text-xs tracking-[0.2em] uppercase py-4 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                  style={{ borderRadius: '0px' }}
                >
                  <Send size={11} />
                  <span>Send Direct Inquiry</span>
                </button>

              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
