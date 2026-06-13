/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  category: 'lashes' | 'brows' | 'waxing';
  name: string;
  price: number;
  duration: number; // in minutes
  description: string;
  icon?: string;
  image?: string;
  benefits?: string[];
  popular?: boolean;
}

export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  price: number;
  date: string;
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
  timestamp: number;
}

export interface Testimonial {
  id: string;
  rating: number;
  quote: string;
  author: string;
  source: string;
  date?: string;
}

export interface GiftCardTransaction {
  id: string;
  type: 'purchase' | 'reload' | 'redemption';
  amount: number;
  timestamp: number;
  notes?: string;
}

export interface GiftCard {
  code: string;
  balance: number;
  initialAmount: number;
  buyerName: string;
  buyerEmail: string;
  recipientName: string;
  recipientEmail: string;
  message?: string;
  theme: 'classic' | 'radiant' | 'midnight';
  createdAt: number;
  transactions: GiftCardTransaction[];
}

