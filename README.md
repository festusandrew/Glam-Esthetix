# Glam Esthetix - Luxury Beauty Studio Web Application

Welcome to the official repository for the **Glam Esthetix** web application. Designed for a high-end beauty and esthetician studio based in Pacifica, CA, owned by licensed esthetician **Jasmine**. 

This application provides a premium, responsive, and interactive online experience that reflects the studio's luxury branding, allowing clients to explore services, purchase digital gift cards, read and write reviews, and book private appointments.

---

## 🌟 Core Features

### 1. Interactive Services Catalog
An organized directory of premium beauty treatments categorized into:
* **Lash Extensions:** Classic Lash Set, Hybrid Lash Set, Volume Lash Set.
* **Brows Modeling:** Brow Shape & Tint, Brow Lamination.
* **Waxing Curation:** Lip Wax, Chin Wax, Full Face Wax.
Each service displays the duration, price, direct benefits, and a one-click CTA to initiate booking.

### 2. Multi-Step Appointment Scheduler
An intuitive booking wizard that guides the client through a seamless booking process:
* **Step 1 (Service & Timing):** Dynamic drop-down selection of services, an interactive calendar showing availability for the next 14 days, and time slot selection.
* **Step 2 (Client Profile):** Capture client contact info, and special aesthetic or sensitivity requests.
* **Step 3 (Confirmation):** Receipt showing a cost breakdown, including Pacifica local tax rate (8.25%).
* **Persistency:** Booked appointments are saved to the browser's `localStorage` and can be reviewed or cancelled from the sidebar.

### 3. Digital Gift Cards
A complete interactive flow for purchasing and management of digital gift cards:
* **Card Designer:** Live preview of card designs with themes like *Classic*, *Radiant*, and *Midnight*.
* **Custom Values:** Select standard amounts ($50, $100, $150, $200) or enter a custom amount.
* **Inquiry System:** Check balances, add funds, or simulate redemption using card codes.

### 4. Interactive Image Gallery
An asymmetric media gallery showcasing actual studio results with:
* Category filters (All, Lashes, Brows, Waxing).
* Zoom-in Lightbox view for high-definition close-up inspection.

### 5. Client Testimonials
An interactive reviews section featuring:
* Verified ratings and reviews.
* A form for clients to submit their feedback, which dynamically populates the list.

---

## 🛠️ Technology Stack

* **Core Framework:** [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
* **Build tool & Dev Server:** [Vite 6](https://vitejs.dev/)
* **Styling & Responsive Layout:** [Tailwind CSS 4](https://tailwindcss.com/)
* **Animations:** [Motion (Framer Motion)](https://motion.dev/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Analytics:** [Vercel Analytics](https://vercel.com/docs/analytics)

---

## 📂 Project Structure

```bash
Glam-Esthetix/
├── assets/                  # High-quality image assets
├── src/
│   ├── components/          # React components
│   │   ├── AboutContact.tsx # Biography, contact details & inquiry form
│   │   ├── BookingBanner.tsx# Subtle booking call-to-action banner
│   │   ├── BookingForm.tsx  # Multi-step appointment reservation wizard
│   │   ├── Footer.tsx       # Standard legal and address footer
│   │   ├── Gallery.tsx      # Asymmetric media showcase with Lightbox
│   │   ├── GiftCards.tsx    # Digital gift card purchase & management system
│   │   ├── Hero.tsx         # Main landing section with CTA buttons
│   │   ├── Logo.tsx         # SVG logo asset with clean typography
│   │   ├── Navbar.tsx       # Sticky navigation bar
│   │   ├── Services.tsx     # Services catalog with detailed cards
│   │   ├── Stats.tsx        # Highlighting key studio achievements
│   │   └── Testimonials.tsx # Customer reviews carousel & feedback form
│   ├── data.ts              # Local static data (services, testimonials, etc.)
│   ├── types.ts             # TypeScript type and interface definitions
│   ├── index.css            # Global CSS styling and Tailwind setup
│   ├── main.tsx             # Application entry point
│   ├── vite-env.d.ts        # TypeScript asset module definitions
│   └── App.tsx              # Main page container and routing structure
├── index.html               # Main HTML document template
├── package.json             # NPM package configurations
├── tsconfig.json            # TypeScript configuration options
└── vite.config.ts           # Vite bundler options
```

---

## 🚀 Getting Started

### Prerequisites
* Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Installation

1. Clone or navigate into the repository:
   ```bash
   cd Glam-Esthetix
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   *The server will start, typically hosting the app at `http://localhost:3000`.*

### Production Build

To compile the application into optimized static assets for hosting:
```bash
npm run build
```
*The output files will be created in the `dist/` directory, ready to be hosted on Netlify, Vercel, Firebase Hosting, or any static provider.*

### Code Quality Check

Run the TypeScript compiler to check for type errors:
```bash
npm run lint
```
