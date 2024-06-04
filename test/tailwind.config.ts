import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        sm: '4px',
      },
      gap: {
        4: '4px',
        8: '8px',
        16: '16px',
        32: '32px',
        64: '64px',
      },
      fontSize: {
        md2: '20px',
        md: '24px',
        32: '32px',
      },
      zIndex: {
        '20': '20',
      },
      spacing: {
        2: '2px',
        4: '4px',
        8: '8px',
        12: '12px',
        16: '16px',
        20: '20px',
        22: '22px',
        24: '24px',
        28: '28px',
        32: '32px',
        64: '64px',
        48: '48px',
      },
    },
  },
  plugins: [],
}
export default config
