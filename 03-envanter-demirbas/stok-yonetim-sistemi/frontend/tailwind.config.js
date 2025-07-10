/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f6f7fb',
        card: '#fff',
        sidebar: '#181c2e',
        primary: {
          DEFAULT: '#6366f1',
          light: '#a5b4fc',
          dark: '#4338ca',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          DEFAULT: '#22d3ee',
          light: '#67e8f9',
          dark: '#0e7490',
        },
        accent: {
          DEFAULT: '#fbbf24',
        },
        muted: '#e5e7eb',
        border: '#e5e7eb',
        success: '#22c55e',
        danger: '#ef4444',
      },
      borderRadius: {
        xl: '1.5rem',
        lg: '1rem',
        md: '0.75rem',
        sm: '0.5rem',
      },
      boxShadow: {
        card: '0 4px 24px 0 rgba(34, 41, 47, 0.08)',
        soft: '0 2px 8px 0 rgba(34, 41, 47, 0.04)',
      },
    },
  },
  plugins: [],
} 