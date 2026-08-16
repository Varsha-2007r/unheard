/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          ice: '#F7F9FC',      // Primary background (Ice White)
          cool: '#EEF3FA',     // Secondary background (Cool White)
          white: '#FFFFFF',    // Card background (Pure White)
          card: '#FFFFFF',
        },
        royal: {
          blue: '#2563EB',     // Primary accent (Royal Blue)
          deep: '#1D4ED8',     // Deep accent (Strong Royal Blue)
          sky: '#60A5FA',      // Bright highlight (Sky Blue)
          soft: '#DBEAFE',     // Soft Blue tint
        },
        alert: {
          red: '#EF4444',      // Critical alert only (~3%)
          amber: '#F59E0B',
          emerald: '#10B981',
        },
        text: {
          primary: '#0F172A',  // Dark Navy
          secondary: '#64748B',// Slate secondary text
          muted: '#94A3B8',    // Muted text
        },
        cardBorder: '#D9E2F0', // Card border
        // Backwards compatibility mappings for smooth migration
        obsidian: {
          950: '#EEF3FA',
          900: '#F7F9FC',
          800: '#FFFFFF',
          700: '#F1F5F9',
          600: '#E2E8F0',
          border: '#D9E2F0',
        },
        signal: {
          cyan: '#2563EB',     // Mapped to Royal Blue
          violet: '#1D4ED8',   // Mapped to Deep Blue
          coral: '#2563EB',    // Mapped to Royal Blue
          emerald: '#10B981',
          amber: '#F59E0B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Outfit', 'Inter', 'sans-serif']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      boxShadow: {
        'clean-card': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)',
        'clean-hover': '0 10px 25px -5px rgba(37, 99, 235, 0.1), 0 8px 10px -6px rgba(37, 99, 235, 0.05)',
        'clean-active': '0 0 0 2px #2563EB, 0 8px 20px -4px rgba(37, 99, 235, 0.15)',
        'glow-blue': '0 0 20px -2px rgba(37, 99, 235, 0.25)',
      }
    },
  },
  plugins: [],
}
