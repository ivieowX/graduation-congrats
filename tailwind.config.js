export default {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#7C3AED" }, // violet-600
        accent:  { DEFAULT: "#06B6D4" }, // cyan-500
        brand: {
          fb: "#1877F2",
          ig: "#E1306C",
          tiktok: "#010101"
        }
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #1E1B4B 0%, #4C1D95 35%, #0E7490 100%)'
      }
    }
  },
  plugins: []
}
