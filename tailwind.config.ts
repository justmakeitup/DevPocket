import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "375px",
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        neon: {
          cyan: "#00F0FF",
          blue: "#3B82F6",
          violet: "#8B5CF6",
          purple: "#A855F7",
          lime: "#84CC16",
          pink: "#EC4899",
        },
        surface: {
          light: "#FFFFFF",
          lightMuted: "#F8FAFC",
          lightSubtle: "#F1F5F9",
          dark: "#0C0D12",
          darkMuted: "#13141C",
          darkSubtle: "#1B1C26",
          cardDark: "rgba(18, 19, 28, 0.75)",
          cardLight: "rgba(255, 255, 255, 0.9)",
        },
        border: {
          light: "#E2E8F0",
          lightHover: "#CBD5E1",
          dark: "#232533",
          darkHover: "#35384D",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-geist-sans)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "var(--font-geist-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      keyframes: {
        "neon-rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", filter: "blur(20px)" },
          "50%": { opacity: "0.8", filter: "blur(28px)" },
        },
        borderGlow: {
          "0%, 100%": {
            borderColor: "rgba(0, 240, 255, 0.4)",
            boxShadow: "0 0 15px rgba(0, 240, 255, 0.2)",
          },
          "33%": {
            borderColor: "rgba(59, 130, 246, 0.4)",
            boxShadow: "0 0 15px rgba(59, 130, 246, 0.2)",
          },
          "66%": {
            borderColor: "rgba(139, 92, 246, 0.4)",
            boxShadow: "0 0 15px rgba(139, 92, 246, 0.2)",
          },
        },
      },
      animation: {
        "neon-rotate": "neon-rotate 6s linear infinite",
        "neon-rotate-slow": "neon-rotate 12s linear infinite",
        shimmer: "shimmer 2.5s infinite linear",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "border-glow": "borderGlow 6s ease-in-out infinite",
      },
      backgroundImage: {
        "dot-grid-dark": "radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)",
        "dot-grid-light": "radial-gradient(rgba(0, 0, 0, 0.06) 1px, transparent 1px)",
        "neon-gradient": "linear-gradient(135deg, #00F0FF 0%, #3B82F6 40%, #8B5CF6 80%, #84CC16 100%)",
        "neon-subtle": "linear-gradient(135deg, rgba(0, 240, 255, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
