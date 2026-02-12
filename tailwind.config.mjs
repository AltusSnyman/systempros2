/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                main: '#0A0A0A',
                surface: '#1A1A1A',
                glass: 'rgba(26, 26, 26, 0.6)',
                highlight: 'rgba(59, 130, 246, 0.3)',
                primary: '#FFFFFF',
                secondary: '#A3A3A3',
                accent: '#3B82F6',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                body: ['Roboto', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            backgroundImage: {
                'gradient-hero': 'linear-gradient(180deg, rgba(10,10,10,0) 0%, #0A0A0A 100%)',
                'gradient-glow': 'radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
            },
            animation: {
                'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
                'spin-slow': 'spin 30s linear infinite',
                'fade-in-up': 'fade-up 0.8s ease-out forwards',
            },
            keyframes: {
                'border-beam': {
                    '100%': { 'offset-distance': '100%' },
                },
                'fade-up': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
