/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Sparkles, Check, Trash2, CalendarCheck, ShieldCheck, Heart } from 'lucide-react';
import { SERVICES } from '../data';
import { Service, Appointment } from '../types';

interface BookingFormProps {
  preselectedServiceId?: string;
  onBookingSuccess: () => void;
}

export default function BookingForm({ preselectedServiceId, onBookingSuccess }: BookingFormProps) {
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeBookings, setActiveBookings] = useState<Appointment[]>([]);
  const [currentStep, setCurrentStep] = useState(1); // 1: Service/Time, 2: Client Info, 3: Confirmed

  // Pre-load preselectedServiceId from props
  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServiceId(preselectedServiceId);
    } else {
      setSelectedServiceId(SERVICES[0]?.id || '');
    }
  }, [preselectedServiceId]);

  // Load existing bookings from localstorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('glam_appointments');
    if (saved) {
      try {
        setActiveBookings(JSON.parse(saved));
      } catch (e) {
        setActiveBookings([]);
      }
    }
  }, []);

  // Generate next 14 calendar days starting from local date: 2026-06-12 (Friday)
  const generateDates = () => {
    const dates = [];
    const baseDate = new Date(2026, 5, 12); // June 12 is month index 5
    
    for (let i = 0; i < 14; i++) {
      const nextDate = new Date(baseDate);
      nextDate.setDate(baseDate.getDate() + i);
      
      const dayName = nextDate.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = nextDate.getDate();
      const monthLabel = nextDate.toLocaleDateString('en-US', { month: 'short' });
      const fullString = nextDate.toISOString().split('T')[0];
      
      dates.push({
        dayName,
        dayNum,
        monthLabel,
        fullString
      });
    }
    return dates;
  };

  const datesToPick = generateDates();

  // Set default state date on first render
  useEffect(() => {
    if (datesToPick.length > 0 && !selectedDate) {
      setSelectedDate(datesToPick[0].fullString);
    }
  }, [datesToPick, selectedDate]);

  // Custom standard available times
  const timeSlots = [
    '09:00 AM',
    '10:30 AM',
    '12:00 PM',
    '01:30 PM',
    '03:00 PM',
    '04:30 PM',
    '06:00 PM'
  ];

  // Set default state time on first load
  useEffect(() => {
    if (!selectedTime) {
      setSelectedTime(timeSlots[0]);
    }
  }, [selectedTime]);

  const activeService = SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];

  // Price receipt calculation
  const subtotal = activeService?.price || 0;
  const taxEst = Number((subtotal * 0.0825).toFixed(2)); // Pacifica local tax rate of 8.25%
  const totalCost = Number((subtotal + taxEst).toFixed(2));

  // Handle appointment scheduling
  const handleFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedServiceId || !selectedDate || !selectedTime || !clientName || !clientEmail || !clientPhone) {
      return;
    }

    setIsSubmitting(true);

    // Realistic beauty salon processing simulation
    setTimeout(() => {
      const newAppointment: Appointment = {
        id: `apt-${Date.now()}`,
        serviceId: selectedServiceId,
        serviceName: activeService.name,
        price: activeService.price,
        date: selectedDate,
        time: selectedTime,
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim(),
        clientPhone: clientPhone.trim(),
        notes: clientNotes.trim(),
        timestamp: Date.now()
      };

      const revisedList = [newAppointment, ...activeBookings];
      setActiveBookings(revisedList);
      localStorage.setItem('glam_appointments', JSON.stringify(revisedList));

      setIsSubmitting(false);
      setCurrentStep(3); // Go to success confirmation screen
      onBookingSuccess();
    }, 1500);
  };

  // Cancel reservation locally
  const handleCancelAppointment = (id: string) => {
    const updated = activeBookings.filter(apt => apt.id !== id);
    setActiveBookings(updated);
    localStorage.setItem('glam_appointments', JSON.stringify(updated));
  };

  // Reset reservation wizard
  const resetFormWizard = () => {
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setClientNotes('');
    setCurrentStep(1);
  };

  // Format date display nicely
  const getReadableDate = (dateStr: string) => {
    if (!dateStr) return '';
    const dateObj = new Date(dateStr + 'T00:00:00'); // ensure local timezone parsing
    return dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <section id="booking-anchor" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-20">
      
      {/* Block Header */}
      <div className="mb-20">
        <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#C9995A] font-semibold mb-3">
          INSTANT BOOKING
        </p>
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-8">
          <h2 className="font-display text-4xl font-light text-[#1A1008] tracking-tight whitespace-nowrap">
            Schedule Appointment
          </h2>
          <div className="h-[0.5px] bg-[#C9995A]/30 w-full mt-4 sm:mt-0"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Core Wizard Form (Left 7 Columns) */}
        <div className="lg:col-span-7 bg-white border border-[#1A1008]/10 p-8 md:p-10 shadow-sm">
          
          {/* Step Indicators */}
          <div className="flex items-center space-x-4 mb-10 text-xs font-sans text-left">
            <span className={`pb-1 uppercase tracking-widest text-[9.5px] font-semibold ${currentStep === 1 ? 'border-b-[1.5px] border-[#C9995A] text-[#C9995A]' : 'text-[#1A1008]/40'}`}>
              01. Service &amp; Timing
            </span>
            <span className="text-[#1A1008]/20">&rarr;</span>
            <span className={`pb-1 uppercase tracking-widest text-[9.5px] font-semibold ${currentStep === 2 ? 'border-b-[1.5px] border-[#C9995A] text-[#C9995A]' : 'text-[#1A1008]/40'}`}>
              02. Client Profile
            </span>
            <span className="text-[#1A1008]/20">&rarr;</span>
            <span className={`pb-1 uppercase tracking-widest text-[9.5px] font-semibold ${currentStep === 3 ? 'border-b-[1.5px] border-[#C9995A] text-[#C9995A]' : 'text-[#1A1008]/40'}`}>
              03. Confirmation
            </span>
          </div>

          {/* SCREEN 1: Setup Details & Time Calendar */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-fade-in text-left">
              
              {/* Select Service Dropdown */}
              <div className="space-y-3">
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#1A1008]/65 font-bold" htmlFor="select-service-dropdown">
                  Select Treatment Service
                </label>
                <select
                  id="select-service-dropdown"
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full bg-[#FAF9F5] border border-[#1A1008]/15 hover:border-[#C9995A]/45 p-4 text-xs tracking-wider text-[#1A1008] focus:outline-none focus:border-[#C9995A] transition-colors cursor-pointer font-sans"
                  style={{ borderRadius: '0px', colorScheme: 'light' }}
                >
                  <optgroup label="Lash Extensions Catalog">
                    {SERVICES.filter(s => s.category === 'lashes').map(s => (
                      <option key={s.id} value={s.id} className="bg-white text-[#1A1008] text-xs py-2">{s.name} &mdash; ${s.price}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Brows Modeling">
                    {SERVICES.filter(s => s.category === 'brows').map(s => (
                      <option key={s.id} value={s.id} className="bg-white text-[#1A1008] text-xs py-2">{s.name} &mdash; ${s.price}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Soothing Waxing Curation">
                    {SERVICES.filter(s => s.category === 'waxing').map(s => (
                      <option key={s.id} value={s.id} className="bg-white text-[#1A1008] text-xs py-2">{s.name} &mdash; ${s.price}</option>
                    ))}
                  </optgroup>
                </select>
                
                {/* Invisible target triggers for programmatical selections from Gallery / card clicks */}
                {SERVICES.map(s => (
                  <button 
                    key={s.id}
                    id={`select-service-trigger-${s.id}`}
                    onClick={() => setSelectedServiceId(s.id)}
                    className="hidden"
                    type="button"
                  />
                ))}
              </div>

              {/* Advanced Calendar Custom Picker */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CalendarIcon size={12} className="text-[#C9995A]" />
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#1A1008]/65 font-bold">
                    Choose Booking Date
                  </label>
                </div>
                
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {datesToPick.map((day) => {
                    const isSelected = selectedDate === day.fullString;
                    return (
                      <button
                        type="button"
                        key={day.fullString}
                        onClick={() => setSelectedDate(day.fullString)}
                        className={`p-3 text-center transition-all duration-300 border cursor-pointer hover:border-[#C9995A] ${
                          isSelected 
                            ? 'bg-[#C9995A] text-[#FAF9F5] border-[#C9995A] font-semibold' 
                            : 'bg-[#FAF9F5] text-[#1A1008] border-[#1A1008]/15'
                        }`}
                        style={{ borderRadius: '0px' }}
                      >
                        <p className="text-[9px] uppercase tracking-wider opacity-60 font-semibold">{day.dayName}</p>
                        <p className="font-display text-base font-light my-0.5">{day.dayNum}</p>
                        <p className="text-[8.5px] uppercase tracking-widest opacity-60 font-medium">{day.monthLabel}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Timing Hour selection */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Clock size={12} className="text-[#C9995A]" />
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#1A1008]/65 font-bold">
                    Select Start Time Window
                  </label>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {timeSlots.map((time) => {
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        type="button"
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 text-[10px] uppercase tracking-widest transition-all duration-300 border cursor-pointer hover:border-[#C9995A] font-sans font-semibold ${
                          isSelected 
                            ? 'bg-[#C9995A] text-[#FAF9F5] border-[#C9995A]' 
                            : 'bg-[#FAF9F5] text-[#1A1008]/80 border-[#1A1008]/15'
                        }`}
                        style={{ borderRadius: '0px' }}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Progress CTA */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-full bg-[#C9995A] hover:bg-[#1A1008] text-[#FAF9F5] hover:text-[#C9995A] border border-transparent hover:border-[#C9995A] font-sans font-bold text-xs tracking-[0.2em] uppercase py-4.5 transition-all duration-300 cursor-pointer"
                  style={{ borderRadius: '0px' }}
                >
                  Continue to Personal Details
                </button>
              </div>

            </div>
          )}

          {/* SCREEN 2: Client Profile Inputs */}
          {currentStep === 2 && (
            <form onSubmit={handleFormSubmission} className="space-y-6 animate-fade-in text-left">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                <div className="space-y-2">
                  <label htmlFor="client-name" className="block text-[10px] uppercase tracking-[0.18em] text-[#1A1008]/70 font-bold font-sans">Full Name</label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    placeholder="e.g. Sarah Connor"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-[#FAF9F5] border border-[#1A1008]/15 p-3 px-4 text-xs font-light text-[#1A1008] placeholder-[#1A1008]/30 focus:outline-none focus:border-[#C9995A] transition-colors font-sans"
                    style={{ borderRadius: '0px' }}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="client-email" className="block text-[10px] uppercase tracking-[0.18em] text-[#1A1008]/70 font-bold font-sans">Email Address</label>
                  <input
                    id="client-email"
                    type="email"
                    required
                    placeholder="e.g. sarah@outlook.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full bg-[#FAF9F5] border border-[#1A1008]/15 p-3 px-4 text-xs font-light text-[#1A1008] placeholder-[#1A1008]/30 focus:outline-none focus:border-[#C9995A] transition-colors font-sans"
                    style={{ borderRadius: '0px' }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                <div className="space-y-2">
                  <label htmlFor="client-phone" className="block text-[10px] uppercase tracking-[0.18em] text-[#1A1008]/70 font-bold font-sans">Contact Number</label>
                  <input
                    id="client-phone"
                    type="tel"
                    required
                    placeholder="e.g. (650) 555-0199"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-[#FAF9F5] border border-[#1A1008]/15 p-3 px-4 text-xs font-light text-[#1A1008] placeholder-[#1A1008]/30 focus:outline-none focus:border-[#C9995A] transition-colors font-sans"
                    style={{ borderRadius: '0px' }}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="treatment-type" className="block text-[10px] uppercase tracking-[0.18em] text-[#1A1008]/70 font-bold font-sans">Location Outlet</label>
                  <input
                    id="treatment-type"
                    type="text"
                    disabled
                    value="Pacifica Clinic, CA (By Appointment only)"
                    className="w-full bg-[#FAF9F5]/80 border border-[#1A1008]/10 p-3 px-4 text-xs text-[#1A1008]/50 font-mono italic"
                    style={{ borderRadius: '0px' }}
                  />
                </div>
              </div>

              {/* Personal Notes */}
              <div className="space-y-2">
                <label htmlFor="client-notes" className="block text-[10px] uppercase tracking-[0.18em] text-[#1A1008]/70 font-bold font-sans">Aesthetic Requests / Sensitivity Preferences (Optional)</label>
                <textarea
                  id="client-notes"
                  rows={3}
                  placeholder="Tell us about your eyelashes style preferences, known skin sensitivities, adhesive preferences, or lookbook inspirations..."
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  className="w-full bg-[#FAF9F5] border border-[#1A1008]/15 p-3 px-4 text-xs font-light text-[#1A1008] placeholder-[#1A1008]/30 focus:outline-none focus:border-[#C9995A] transition-colors resize-none font-sans"
                  style={{ borderRadius: '0px' }}
                />
              </div>

              {/* Control Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="w-full sm:w-1/3 border border-[#1A1008]/10 hover:border-[#C9995A] text-[#1A1008]/60 hover:text-[#1A1008] hover:bg-[#FAF9F5] font-sans text-xs tracking-[0.2em] uppercase py-4 cursor-pointer"
                  style={{ borderRadius: '0px' }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-2/3 bg-[#C9995A] hover:bg-[#1A1008] text-[#FAF9F5] hover:text-[#C9995A] border border-transparent hover:border-[#C9995A] font-sans font-bold text-xs tracking-[0.2em] uppercase py-4 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                  style={{ borderRadius: '0px' }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
                      <span>Verifying Schedule Spot...</span>
                    </>
                  ) : (
                    <span>Confirm Booking &mdash; ${activeService?.price}</span>
                  )}
                </button>
              </div>

            </form>
          )}

          {/* SCREEN 3: Success Confirmation Screen */}
          {currentStep === 3 && (
            <div className="space-y-6 text-center py-8 animate-fade-in text-left">
              <div className="w-16 h-16 rounded-full border border-[#C9995A] flex items-center justify-center mx-auto text-[#C9995A]">
                <Check size={28} />
              </div>

              <div className="space-y-2">
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#C9995A] font-bold text-center">SECURED CONFIRMATION</p>
                <h3 className="font-display text-4xl text-[#1A1008] font-light text-center">Your Spot is Reserved!</h3>
                <p className="text-xs text-[#1A1008]/75 max-w-md mx-auto leading-relaxed font-light text-center">
                  Excellent! We have locked down your customized session for <span className="text-[#C9995A] font-bold">{activeService?.name}</span> on <span className="text-[#C9995A] font-bold">{getReadableDate(selectedDate)}</span> at <span className="text-[#C9995A] font-bold">{selectedTime}</span>.
                </p>
              </div>

              <div className="p-6 border border-[#1A1008]/10 bg-[#FAF9F5] max-w-md mx-auto text-left space-y-2.5 text-xs font-sans">
                <p className="font-bold text-[#1A1008] uppercase tracking-wider text-[10px] text-[#C9995A]">Guest Ticket Details</p>
                <p className="text-[#1A1008]/80"><strong className="text-[#1A1008]">Patron Name:</strong> {clientName}</p>
                <p className="text-[#1A1008]/80"><strong className="text-[#1A1008]">Email notification dispatching to:</strong> {clientEmail}</p>
                <p className="text-[#1A1008]/80"><strong className="text-[#1A1008]">SMS text status updates:</strong> {clientPhone}</p>
                <p className="text-[#1A1008]/80"><strong className="text-[#1A1008]">Location:</strong> Pacifica Studio Clinic, CA</p>
              </div>

              <div className="pt-6 text-center">
                <button
                  type="button"
                  onClick={resetFormWizard}
                  className="bg-[#C9995A] text-[#FAF9F5] hover:bg-[#1A1008] hover:text-[#C9995A] border border-transparent hover:border-[#C9995A] text-xs font-sans font-bold uppercase tracking-[0.2em] py-4 px-10 transition-all duration-300 cursor-pointer"
                  style={{ borderRadius: '0px' }}
                >
                  Schedule Another Treatment
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Dynamic Cost Receipt Panel (Right 5 Columns) */}
        <div className="lg:col-span-5 bg-white border border-[#1A1008]/10 p-8 flex flex-col justify-between shadow-sm text-left">
          
          <div className="space-y-6">
            <div className="border-b border-[#1A1008]/10 pb-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CalendarCheck size={16} className="text-[#C9995A]" />
                <h3 className="font-display text-xl text-[#1A1008] font-light">Service Invoice</h3>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#1A1008]/40">Est. 2026</span>
            </div>

            {/* Custom receipt list */}
            <div className="space-y-4 text-xs font-sans font-light">
              
              <div className="flex justify-between gap-4 items-center">
                <span className="text-[#1A1008]/70 text-[11px]">Selected Treatment:</span>
                <span className="text-[#1A1008] text-right font-display text-base font-semibold">
                  {activeService?.name || 'Classic Lash Set'}
                </span>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-[#1A1008]/70 text-[11px]">Stylist Specialty:</span>
                <span className="uppercase tracking-widest text-[9px] text-[#C9995A] font-bold font-mono">
                  {activeService?.category || 'lashes'}
                </span>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-[#1A1008]/70 text-[11px]">Treatment Duration:</span>
                <span className="font-mono text-[#1A1008] font-bold text-[11px]">
                  {activeService?.duration || 90} mins
                </span>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-[#1A1008]/70 text-[11px]">Studio location:</span>
                <span className="text-[#1A1008] text-[11px] font-semibold">
                  Pacifica, CA
                </span>
              </div>

              <div className="h-[0.5px] bg-[#1A1008]/10 my-2"></div>

              <div className="flex justify-between items-baseline">
                <span className="text-[#1A1008]/70 text-[11px]">Service Subtotal:</span>
                <span className="font-mono text-[#1A1008] font-bold">${subtotal}</span>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-[#1A1008]/70 text-[11px]">Pacifica County Tax (8.25%):</span>
                <span className="font-mono text-[#1A1008] font-bold">${taxEst.toFixed(2)}</span>
              </div>

              <div className="h-[0.5px] bg-[#C9995A]/30 my-2"></div>

              {/* Total Row */}
              <div className="flex justify-between items-baseline pt-2">
                <span className="font-display text-lg text-[#1A1008] font-light uppercase tracking-wider">Total Est.</span>
                <span className="font-display text-2xl text-[#C9995A] font-bold font-mono">${totalCost.toFixed(2)}</span>
              </div>

            </div>

            <div className="bg-[#FAF9F5] p-4 border border-[#1A1008]/5 text-[10px] leading-relaxed text-[#1A1008]/60 space-y-1 font-sans">
              <p className="font-bold text-[#1A1008]/85 text-xs flex items-center space-x-1.5 mb-1 text-left">
                <ShieldCheck size={12} className="text-[#C9995A]" />
                <span>Aesthetic Safety Policy:</span>
              </p>
              <p className="text-left">&bull; 24-hour cancellation rule applies to preserve slots.</p>
              <p className="text-left">&bull; Cash, cards, and Apple/Google Pay accepted upon session departure.</p>
              <p className="text-left">&bull; All materials hospital sanitization board certified.</p>
            </div>
          </div>

          {/* MY HISTORIC LOCAL RESERVATIONS Persist Tracker */}
          {activeBookings.length > 0 && (
            <div className="mt-10 pt-6 border-t border-[#1A1008]/10 space-y-4">
              <h4 className="font-display text-base text-[#1A1008] font-light flex items-center space-x-2">
                <Heart size={12} className="text-[#C9995A] fill-[#C9995A]" />
                <span>My Active Reservations ({activeBookings.length})</span>
              </h4>
              
              <div className="max-h-[180px] overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                {activeBookings.map((apt) => (
                  <div key={apt.id} className="bg-[#FAF9F5] border border-[#1A1008]/10 p-3.5 flex justify-between items-center text-xs">
                    <div className="space-y-1 text-left">
                      <p className="font-bold text-[#1A1008] text-[12px]">{apt.serviceName}</p>
                      <p className="text-[#C9995A] text-[9.3px] tracking-widest font-bold font-mono">
                        {apt.date} at {apt.time}
                      </p>
                      <p className="text-[10px] text-[#1A1008]/55 font-bold">For {apt.clientName}</p>
                    </div>

                    <button
                      onClick={() => handleCancelAppointment(apt.id)}
                      className="p-2 text-stone-500 hover:text-red-400 transition-colors cursor-pointer"
                      title="Cancel spot"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
