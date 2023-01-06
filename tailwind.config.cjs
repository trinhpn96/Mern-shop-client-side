/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        baner:
          "url('https://images.unsplash.com/photo-1481437156560-3205f6a55735?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHNob3B8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60')",
      },
      height: {
        navbar: "var(--navbar-height)",
        banner: "var(--banner-height)",
      },
    },
  },
  plugins: [require("daisyui"), require("flowbite/plugin")],
};
