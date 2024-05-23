/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    './src/**/*.vue',
    './src/**/*.jsx',
    './src/**/*.tsx',
    './src/**/*.html',
    './src/**/*.js'
  ],
  theme: {
    screens: {
      'sp': {'max': '700px'},
      'pc': {'min': '724px'}
    },
    extend: {
      fontSize: {
        'xs': '10px',
        'sm': '13px',
        'base': '14px',
      },
      colors: {
        'dark-blue': "#00008b",
      },
      borderColor: {
        'dark-blue': "#00008b",
      },
      backgroundColor: {
        'dark-blue': "#2f3542",
        'soft-blue': "#60687a",
      }
    },
    variants: {
      extend: {
        // Add 'group-active' variant for display utilities like 'block'
        display: ['group-active'],
      },
    },
  },
  plugins: [
    function ({addUtilities}) {
      const newUtilities = {
        '.unselectable': {
          'user-select': 'none',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
};

