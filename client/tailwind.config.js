/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
	"./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
		backgroundImage: {
			'home_img1': "url('/public/home_img1.png')",
			'home_img2': "url('/public/home_img2.png')",
			'brand_name': "url('/public/brand_name.png')"
		}
	},
  },
  plugins: [],
}