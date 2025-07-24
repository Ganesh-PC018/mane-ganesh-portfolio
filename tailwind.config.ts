import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        background: "#f9fafb", // subtle off-white
        foreground: "#1f2937", // dark neutral text
        border: "#e5e7eb",     // light gray
        input: "#f3f4f6",
        ring: "#cbd5e1",

        primary: {
          DEFAULT: "#4f46e5", // Indigo-600
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#64748b", // Gray-500
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f1f5f9", // Slate-100
          foreground: "#475569", // Slate-600
        },
        accent: {
          DEFAULT: "#e2e8f0", // subtle blue-gray
          foreground: "#1e293b",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#1f2937",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#1f2937",
        },
        sidebar: {
          DEFAULT: "#f8fafc",
          foreground: "#1e293b",
          primary: "#4f46e5",
          "primary-foreground": "#ffffff",
          accent: "#cbd5e1",
          "accent-foreground": "#1e293b",
          border: "#e2e8f0",
          ring: "#cbd5e1",
        },
      },
      spacing: {
        compact: "0.5rem",
        "compact-sm": "0.75rem",
        "compact-base": "1rem",
      },
      borderRadius: {
        lg: "1rem",
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
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 1s ease-out forwards",
        fadeInUp: "fadeInUp 0.8s ease-out forwards",
        "pulse-slow": "pulse-slow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
