/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#6366f1",
          light: "#a5b4fc",
          dark: "#4338ca",
          foreground: "#fff",
        },
        secondary: {
          DEFAULT: "#06b6d4",
          light: "#67e8f9",
          dark: "#0e7490",
          foreground: "#fff",
        },
        accent: {
          DEFAULT: "#f59e42",
          light: "#fbbf24",
          dark: "#b45309",
          foreground: "#fff",
        },
        success: {
          DEFAULT: "#22c55e",
          light: "#4ade80",
          dark: "#15803d",
          foreground: "#fff",
        },
        warning: {
          DEFAULT: "#facc15",
          light: "#fde68a",
          dark: "#b45309",
          foreground: "#fff",
        },
        danger: {
          DEFAULT: "#ef4444",
          light: "#fca5a5",
          dark: "#991b1b",
          foreground: "#fff",
        },
        gradient1: "linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)",
        gradient2: "linear-gradient(90deg, #f59e42 0%, #f43f5e 100%)",
        muted: {
          DEFAULT: "#f3f4f6",
          foreground: "#6b7280",
        },
        popover: {
          DEFAULT: "#fff",
          foreground: "#111827",
        },
        card: {
          DEFAULT: "#fff",
          foreground: "#111827",
        },
      },
      borderRadius: {
        xl: "2rem",
        lg: "1.25rem",
        md: "0.75rem",
        sm: "0.5rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "slide-in": {
          from: { transform: "translateY(-10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "slide-out": {
          from: { transform: "translateY(0)", opacity: "1" },
          to: { transform: "translateY(-10px)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "fade-out": "fade-out 0.2s ease-out",
        "slide-in": "slide-in 0.2s ease-out",
        "slide-out": "slide-out 0.2s ease-out",
      },
    },
  },
  plugins: [],
} 