/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, Testimonial } from './types';

export const SERVICES: Service[] = [
  // Lash extensions
  {
    id: 'lash-classic',
    category: 'lashes',
    name: 'Classic Lash Set',
    price: 85,
    duration: 90,
    description: 'One individual high-grade extension applied to one natural lash. Delivers a clean, elegant mascara state.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600&h=600',
    benefits: ['Subtle extension', 'Great for daily wear', 'Custom lengths available'],
    popular: true
  },
  {
    id: 'lash-hybrid',
    category: 'lashes',
    name: 'Hybrid Lash Set',
    price: 110,
    duration: 105,
    description: 'A textured mixture of classic individual lashes and custom light volume fans that flatters all eyes.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600&h=600',
    benefits: ['Textured multi-dimensional look', 'Adds depth & fluffiness', 'Bespoke design']
  },
  {
    id: 'lash-volume',
    category: 'lashes',
    name: 'Volume Lash Set',
    price: 130,
    duration: 120,
    description: 'Ultra-thin lightweight fans of 3-6 extension hairs mapped and nested onto each natural lash for dramatic depth.',
    image: 'https://images.unsplash.com/photo-1582284540020-8acae03f417a?auto=format&fit=crop&q=80&w=600&h=600',
    benefits: ['High density & fullness', 'Ideal for sparse lashes', 'Ultra-light high-grade materials']
  },

  // Brows
  {
    id: 'brow-shape-tint',
    category: 'brows',
    name: 'Brow Shape & Tint',
    price: 45,
    duration: 45,
    description: 'Architectural map, wax, trimming, tweezing, and a customizable tint shade matching your facial tone.',
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=600&h=600',
    benefits: ['Defines facial structure', 'Creates density illusion', 'Lasts up to 4-6 weeks'],
    popular: true
  },
  {
    id: 'brow-lamination',
    category: 'brows',
    name: 'Brow Lamination',
    price: 65,
    duration: 50,
    description: 'Keratin relaxation process turning coarse or irregular brow hairs upward for a fuller, swept-up feathered style.',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=600&h=600',
    benefits: ['Sleek feathered finish', 'Covers gaps instantly', 'Low daily maintenance']
  },

  // Facial waxing
  {
    id: 'waxing-lip',
    category: 'waxing',
    name: 'Lip Wax',
    price: 15,
    duration: 15,
    description: 'Clean, rapid wax utilizing low-temperature, ultra-flexible hard wax for sensitive lip regions.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600&h=600',
    benefits: ['Silky smooth finish', 'Reduces hair regrowth rate', 'Safe on sensitive skin']
  },
  {
    id: 'waxing-chin',
    category: 'waxing',
    name: 'Chin Wax',
    price: 15,
    duration: 15,
    description: 'Precise extraction of unwanted facial hair using skin-conditioning barrier oils.',
    image: 'https://images.unsplash.com/photo-1626015271311-c918c5750d53?auto=format&fit=crop&q=80&w=600&h=600',
    benefits: ['Fast, smooth results', 'No stubble regrowth', 'Instantly brightens']
  },
  {
    id: 'waxing-full-face',
    category: 'waxing',
    name: 'Full Face Wax',
    price: 50,
    duration: 40,
    description: 'Full face curation excluding eyebrows (includes cheeks, temples, lip, chin, and sideburn lines).',
    image: 'https://images.unsplash.com/photo-1519415510236-8aed79dd1555?auto=format&fit=crop&q=80&w=600&h=600',
    benefits: ['Gentle exfoliation benefit', 'Makeup applies flawlessly', 'Long-lasting soft touch']
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    rating: 5,
    quote: "She's an artist. My lashes have never looked this good — natural but elevated. I won't go anywhere else in the Bay.",
    author: "Jane D., Pacifica",
    source: "Yelp"
  },
  {
    id: 'test-2',
    rating: 5,
    quote: "Affordable, professional, and so precise with my brows. I leave every time feeling like a completely different person.",
    author: "Elena G., San Bruno",
    source: "Google"
  },
  {
    id: 'test-3',
    rating: 5,
    quote: "The keratin brow lamination is a total game-changer. My unruly eyebrows are perfectly aligned and feathered, and the retention easily lasts 6+ weeks.",
    author: "Emma S., Half Moon Bay",
    source: "Direct"
  },
  {
    id: 'test-4',
    rating: 5,
    quote: "Lara's lash mapping process is incredibly tailored. She analyzed my natural curvature and drafted custom classic sets that feel weightless around my eyes.",
    author: "Melissa R., San Francisco",
    source: "Google"
  }
];

export const IMAGES = {
  // Classic lash / eye focus
  lashHero: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=1200&h=800",
  // Brow focus
  browFocus: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600&h=600",
  // Waxing / spa focus
  spaFocus: "https://images.unsplash.com/photo-1626015271311-c918c5750d53?auto=format&fit=crop&q=80&w=600&h=600",
  // Large Gallery volume: photorealistic gorgeous long dark classic eyelashes
  galleryVolume: "https://images.unsplash.com/photo-1582284540020-8acae03f417a?auto=format&fit=crop&q=80&w=800&h=1200",
  // Secondary gallery items
  galleryBrowShape: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=600&h=600",
  galleryClassicSet: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=600&h=600",
  galleryHybridSet: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600&h=600",
  galleryBrowTint: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=600&h=600"
};
