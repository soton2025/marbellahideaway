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
        // Orange Brand Identity (from logo)
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Main brand orange
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        
        // Warm Orange Palette
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        
        // Complementary Warm Palette
        sand: {
          50: '#fefdf8',
          100: '#fefbf0',
          200: '#fdf4d9',
          300: '#fbecc2',
          400: '#f7dc94',
          500: '#f3cc66',
          600: '#dbb85c',
          700: '#b6984d',
          800: '#927a3e',
          900: '#776432',
        },
        
        cream: {
          50: '#fffef7',
          100: '#fffcee',
          200: '#fef8d5',
          300: '#fef3bc',
          400: '#fdea8a',
          500: '#fce158',
          600: '#e3cb4f',
          700: '#bda942',
          800: '#978735',
          900: '#7b6e2b',
        },
        
        // Neutral Palette
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        
        // Background and foreground
        background: '#fffef9',
        foreground: '#1c1917',
        
        // Component-specific colors
        card: '#ffffff',
        'card-foreground': '#1c1917',
        popover: '#ffffff',
        'popover-foreground': '#1c1917',
        muted: '#f5f5f4',
        'muted-foreground': '#78716c',
        border: '#e7e5e4',
        input: '#ffffff',
        ring: '#f97316',
        
        // Status colors with orange accent
        destructive: '#dc2626',
        'destructive-foreground': '#ffffff',
      },
      
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Canela', 'ui-serif', 'Georgia', 'serif'],
        canela: ['Canela', 'ui-serif', 'Georgia', 'serif'],
        inter: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      borderRadius: {
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      
      boxShadow: {
        'soft': '0 4px 20px rgba(249, 115, 22, 0.1)',
        'medium': '0 8px 30px rgba(249, 115, 22, 0.15)',
        'strong': '0 12px 40px rgba(249, 115, 22, 0.2)',
        'glow': '0 0 20px rgba(249, 115, 22, 0.3)',
      },
      
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      
      keyframes: {
        fadeUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(249, 115, 22, 0.2)' },
          '100%': { boxShadow: '0 0 30px rgba(249, 115, 22, 0.4)' },
        },
      },
      
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'orange-gradient': 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        'warm-gradient': 'linear-gradient(135deg, #fef3bc 0%, #fed7aa 100%)',
      },
    },
  },
  plugins: [],
};

export default config;