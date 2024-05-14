import { createThemes } from 'tw-colors';

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {

        fontSize: {
            'sm': '12px',
            'base': '14px',
            'xl': '16px',
            '2xl': '20px',
            '3xl': '28px',
            '4xl': '38px',
            '5xl': '50px',
        },

        extend: {
            fontFamily: {
              inter: ["'Inter'", "sans-serif"],
              gelasio: ["'Gelasio'", "serif"],
              monospace: ["Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace"]
            },
        },

    },
    plugins: [
        createThemes({
            light: {
                'white': '#F5F5F5',
                'black': '#1A202C',
                'dark-blue': '#403279',
                'light-green': '#4476B9',
                'grey': '#CBD5E0',
                'dark-grey': '#4A5568',
                'red': '#E53E3E',
                'transparent': 'transparent',
                'twitter': '#1DA1F2',
                'purple': '#805AD5',
                'dark-red': '#8B0000'
            },
            dark: {
                'white': '#2D3748',
                'black': '#F7FAFC',
                'grey': '#4A5568',
                'dark-grey': '#CBD5E0',
                'dark-blue': '#403279',
                'light-green': '#2CBCAB',
                'red': '#E53E3E',
                'transparent': 'transparent',
                'twitter': '#0E71A8',
                'purple': '#6B46C1',
                'dark-red': '#8B0000'
            } 
        })
    ],
};