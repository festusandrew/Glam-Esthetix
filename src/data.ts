/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, Testimonial } from './types';
import lashHero from '../assets/hero-tint-vs-stain.jpg';
import lashClassic from '../assets/lash-classic.jpg';
import browTint from '../assets/brow-tint.jpg';
import browLamination from '../assets/brow-lamination.jpg';
import browShape from '../assets/brow-shape.jpg';
import browFocus from '../assets/brow-focus.jpg';
import jasmine from '../assets/jasmine.jpg';
import lashVolume from '../assets/lash-volume.png';
import lashHybrid from '../assets/lash-hybrid.png';
import spaWaxing from '../assets/spa-waxing.png';

export const SERVICES: Service[] = [
  // Lash extensions
  {
    id: 'lash-classic',
    category: 'lashes',
    name: 'Classic Lash Set',
    price: 85,
    duration: 90,
    description: 'One individual high-grade extension applied to one natural lash. Delivers a clean, elegant mascara state.',
    image: lashClassic,
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
    image: lashHybrid,
    benefits: ['Textured multi-dimensional look', 'Adds depth & fluffiness', 'Bespoke design']
  },
  {
    id: 'lash-volume',
    category: 'lashes',
    name: 'Volume Lash Set',
    price: 130,
    duration: 120,
    description: 'Ultra-thin lightweight fans of 3-6 extension hairs mapped and nested onto each natural lash for dramatic depth.',
    image: lashVolume,
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
    image: browShape,
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
    image: browLamination,
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
    image: spaWaxing,
    benefits: ['Silky smooth finish', 'Reduces hair regrowth rate', 'Safe on sensitive skin']
  },
  {
    id: 'waxing-chin',
    category: 'waxing',
    name: 'Chin Wax',
    price: 15,
    duration: 15,
    description: 'Precise extraction of unwanted facial hair using skin-conditioning barrier oils.',
    image: spaWaxing,
    benefits: ['Fast, smooth results', 'No stubble regrowth', 'Instantly brightens']
  },
  {
    id: 'waxing-full-face',
    category: 'waxing',
    name: 'Full Face Wax',
    price: 50,
    duration: 40,
    description: 'Full face curation excluding eyebrows (includes cheeks, temples, lip, chin, and sideburn lines).',
    image: spaWaxing,
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
    quote: "Jasmine's lash mapping process is incredibly tailored. She analyzed my natural curvature and drafted custom classic sets that feel weightless around my eyes.",
    author: "Melissa R., San Francisco",
    source: "Google"
  }
];

export const IMAGES = {
  // Jasmine profile photo
  jasmine: jasmine,
  // Classic lash / eye focus
  lashHero: lashHero,
  // Brow focus
  browFocus: browFocus,
  // Waxing / spa focus
  spaFocus: spaWaxing,
  // Large Gallery volume: photorealistic gorgeous long dark classic eyelashes
  galleryVolume: lashVolume,
  // Secondary gallery items
  galleryBrowShape: browShape,
  galleryClassicSet: lashClassic,
  galleryHybridSet: lashHybrid,
  galleryBrowTint: browTint
};
