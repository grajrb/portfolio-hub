import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#6366f1', // Indigo-500
					foreground: '#fff',
				},
				secondary: {
					DEFAULT: '#f3f4f6', // Gray-100
					foreground: '#111827',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: '#e5e7eb', // Gray-200
					foreground: '#6b7280',
				},
				accent: {
					DEFAULT: '#f59e42', // Orange-400
					foreground: '#fff',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				'dark-bg': '#18181b',
				'light-bg': '#f9fafb',
				'card-bg': '#fff',
				'card-dark-bg': '#23272f',
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				display: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
			},
			fontSize: {
				base: ['1rem', { lineHeight: '1.75' }],
				sm: ['0.95rem', { lineHeight: '1.7' }],
				lg: ['1.125rem', { lineHeight: '1.8' }],
				xl: ['1.25rem', { lineHeight: '1.8' }],
				'2xl': ['1.5rem', { lineHeight: '1.2' }],
				'3xl': ['1.875rem', { lineHeight: '1.15' }],
				'4xl': ['2.25rem', { lineHeight: '1.1' }],
				'5xl': ['3rem', { lineHeight: '1.05' }],
			},
			borderRadius: {
				lg: '1.25rem',
				md: '0.75rem',
				sm: '0.5rem',
			},
			boxShadow: {
				'soft': '0 4px 24px 0 rgba(0,0,0,0.08)',
				'card': '0 2px 12px 0 rgba(0,0,0,0.06)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				'slide-in': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(20px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.97)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'reveal': {
					'0%': { transform: 'translateY(40px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'underline': {
					'0%': { width: '0%' },
					'100%': { width: '100%' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.4s ease-out forwards',
				'fade-out': 'fade-out 0.4s ease-out forwards',
				'slide-in': 'slide-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
				'slide-in-right': 'slide-in-right 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
				'scale-in': 'scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
				'reveal': 'reveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
				'underline': 'underline 0.3s ease-in-out',
			},
		},
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;