const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  darkMode: ["class"],  // Enables dark mode based on a class toggle
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",  // Add all paths where Tailwind classes are used
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",  // Customize screen sizes for responsive layouts
      },
    },
    extend: {
      // Directly defining colors (not using CSS variables)
      colors: {
        border: "hsl(0, 0%, 90%)",  // Light gray border color
        input: "hsl(0, 0%, 95%)",  // Light gray for inputs
        ring: "hsl(0, 0%, 80%)",  // Lighter ring color
        background: "hsl(0, 0%, 98%)",  // Very light gray background
        foreground: "hsl(0, 0%, 10%)",  // Dark text/foreground color
        primary: {
          DEFAULT: "hsl(210, 100%, 50%)",  // Blue color
          foreground: "hsl(210, 100%, 90%)",  // Lighter blue for text
        },
        warning: {
          DEFAULT: "hsl(45, 100%, 60%)",  // Yellow color (warning)
          foreground: "hsl(45, 100%, 90%)",  // Lighter yellow for text
        },
        danger: {
          DEFAULT: "hsl(0, 100%, 50%)",  // Red color (danger)
          foreground: "hsl(0, 100%, 90%)",  // Lighter red for text
        },
        muted: {
          DEFAULT: "hsl(210, 10%, 80%)",  // Muted blue-gray
          foreground: "hsl(210, 10%, 40%)",  // Darker gray for muted text
        },
        accent: {
          DEFAULT: "hsl(150, 50%, 50%)",  // Green color (complementary to red and blue)
          foreground: "hsl(150, 50%, 90%)",  // Lighter green for text
        },
        popover: {
          DEFAULT: "hsl(240, 100%, 30%)",  // Popover dark blue color
          foreground: "hsl(240, 100%, 80%)",  // Lighter blue for text
        },
        card: {
          DEFAULT: "hsl(360, 100%, 95%)",  // Card background (light pink)
          foreground: "hsl(360, 100%, 40%)",  // Card text color (darker pink)
        },
        chart: {
          "1": "hsl(0, 100%, 50%)",  // Chart color 1 (red)
          "2": "hsl(45, 100%, 60%)",  // Chart color 2 (yellow)
          "3": "hsl(60, 100%, 50%)",  // Chart color 3 (yellow-green)
          "4": "hsl(120, 100%, 50%)",  // Chart color 4 (green)
          "5": "hsl(210, 100%, 50%)",  // Chart color 5 (blue)
        },
      },
      // Border radius customization
      borderRadius: {
        lg: "0.5rem",  // Large border radius
        md: "0.375rem",  // Medium border radius
        sm: "0.25rem",  // Small border radius
      },
      keyframes: {
        scrollCategories: {
          '0%': {
            transform: 'translateX(0)',
          },
          '100%': {
            transform: 'translateX(100%)', // Move the content right
          },
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },  // Animation for accordion opening
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },  // Animation for accordion closing
        },
      },
      fadeIn: {
        '0%': {
          opacity: 0, // Start with the item being invisible
        },
        '100%': {
          opacity: 1, // Fade it to full opacity
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",  // Animation duration and easing for accordion
        'scroll': 'scrollCategories 10s linear infinite',
        'fade-in': 'fadeIn 1.5s ease-in-out'
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('tailwind-scrollbar-hide'),
  ],  // Add the Tailwind Animate plugin
});
