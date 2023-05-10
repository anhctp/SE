/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
  
      // Or if using `src` directory:
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
      
        colors: {
          "ct-dark-600": "#222",
          "ct-dark-200": "#e5e7eb",
          "ct-dark-100": "#f5f6f7",
          "ct-blue-600": "#2363eb",
          "ct-yellow-600": "#f9d13e",
          "ct-t": "#fed6e3 100%",
          "ct-f": "#a8edea 0%",
          "ct-v": "#E3FDF5 50%",
          "ct-r": "#FFE6FA 50%",
        },
        fontFamily: {
          Poppins: ["Poppins, sans-serif"],
        },
        container: {
          center: true,
          padding: "1rem",
          screens: {
            lg: "1125px",
            xl: "1125px",
            "2xl": "1125px",
          },
        },
      },
    },
    plugins: [],
  };
  