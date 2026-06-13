/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import BookingForm from './components/BookingForm';
import AboutContact from './components/AboutContact';
import GiftCards from './components/GiftCards';
import Footer from './components/Footer';
import { CalendarCheck2, X, Sparkles, MapPin } from 'lucide-react';

export default function App() {
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Smooth scroll handler to helper ID
  const scrollToAnchor = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Navbar offset
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

  const handleBookTrigger = (serviceId?: string) => {
    if (serviceId) {
      setPreselectedServiceId(serviceId);
    }
    // Scroll smoothly to Scheduler component
    scrollToAnchor('booking-anchor');
  };

  const handleBookingCompleted = () => {
    setToastMessage('Appointment scheduled! An SMS alert has been dispatched.');
    setTimeout(() => {
      setToastMessage(null);
    }, 6000);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1A1008] selection:bg-[#C9995A]/30 selection:text-[#1A1008] font-sans antialiased relative">
      
      {/* Top Fixed Header */}
      <Navbar onBookClick={() => handleBookTrigger()} />

      {/* Hero Header Section */}
      <Hero 
        onBookClick={handleBookTrigger} 
        onViewServicesClick={() => scrollToAnchor('services')} 
      />

      {/* Numeric Highlights strip */}
      <Stats />

      {/* Services Section with custom dynamic price tables */}
      <Services onBookService={handleBookTrigger} />

      {/* Asymmetric Gallery with Lightbox popup */}
      <Gallery />

      {/* Testimonials Review cards and dynamic submit form */}
      <Testimonials />

      {/* Custom Reservation scheduler */}
      <BookingForm 
        preselectedServiceId={preselectedServiceId} 
        onBookingSuccess={handleBookingCompleted} 
      />

      {/* Digital Gift Card legacy suite */}
      <GiftCards />

      {/* About Section and direct Contact modules */}
      <AboutContact />

      {/* Standard structured legal/location footer */}
      <Footer />

      {/* Aesthetic Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border border-[#C9995A] p-4 flex items-start space-x-4 max-w-sm shadow-2xl animate-fade-in-up">
          <div className="w-10 h-10 border border-[#C9995A]/20 flex items-center justify-center text-[#C9995A] flex-shrink-0">
            <CalendarCheck2 size={18} />
          </div>
          
          <div className="flex-1 space-y-1">
            <p className="font-display text-sm font-semibold tracking-wide text-[#1A1008]">Successfully Scheduled</p>
            <p className="text-xs text-[#1A1008]/75 font-light">{toastMessage}</p>
          </div>

          <button 
            onClick={() => setToastMessage(null)}
            className="text-[#1A1008]/40 hover:text-[#C9995A] transition-colors p-1"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Back-to-top subtle bottom indicator */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:block">
        <div className="flex items-center space-x-2 text-[9px] uppercase tracking-[0.25em] text-[#1A1008]/40 font-mono">
          <MapPin size={10} className="text-[#C9995A]" />
          <span>Pacifica, California</span>
        </div>
      </div>

    </div>
  );
}
