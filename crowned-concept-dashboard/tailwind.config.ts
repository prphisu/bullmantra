// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Shared colors from your previous public site setup (light, earthy tones)
        'brand-bg': '#F4F1ED',
        'brand-surface': '#EAE5E0',
        'brand-primary': '#A39171',
        'brand-secondary': '#D3C5AA',
        'brand-text': '#403833',
        'brand-text-light': '#7D7068',
        'brand-nav_active_bg': '#EAE5E0', // Example for dashboard/sidebar

        // NEW: Specific colors for the Team Page (from the video)
        'team-bg': '#F4F1ED',
        'team-primary-heading': '#403833',
        'team-secondary-text': '#7D7068',
        'team-accent-gold': '#A39171',
        'team-surface-card': '#FFFFFF',
        'team-border-card': '#EAE5E0',
        'team-shadow-card': 'rgba(0, 0, 0, 0.05)',
        'team-quote-tag-bg': '#E8D4BB',
        'team-quote-tag-text': '#403833',
        'team-social-icon': '#A39171',

        // NEW Dark Theme Palette
        'dark-primary': '#f6f7faff',     // Deep navy/black background
        'dark-secondary': '#16182C',  // Slightly lighter card background
        'accent-blue': '#ff3a3aff',     // Primary blue for buttons and highlights
        'accent-gold': '#F5B32F',     // Gold for ratings and special accents
        'text-primary': '#211e1eff',    // Pure white for headlines
        'text-secondary': '#A0AEC0',
      },
      fontFamily: {
        serif: ['var(--font-playfair)'],
        sans: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
};
export default config;