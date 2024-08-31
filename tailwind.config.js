/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}", "./node_modules/flowbite/**/*.js"],
	theme: {
		extend: {
			colors: {
				"sunset-orange": {
					50: "#fff4eb",
					100: "#ffe5c7",
					200: "#ffd6a2",
					300: "#ffc77a",
					400: "#ffb64e",
					500: "#FFA500",
					600: "#e99700",
					700: "#d48900",
					800: "#bf7c00",
					900: "#ab6f00",
					950: "#976200",
				},
				"cityscape-blue": {
					50: "#ebecee",
					100: "#c0c5ce",
					200: "#96a0b0",
					300: "#6d7c92",
					400: "#455a76",
					500: "#1A3A5A",
					600: "#183552",
					700: "#16304b",
					800: "#142c44",
					900: "#12273c",
					950: "#0f2235",
				},
				"forest-green": {
					50: "#ebf1eb",
					100: "#c7ddc2",
					200: "#a2c99a",
					300: "#7db473",
					400: "#55a04c",
					500: "#228B22",
					600: "#1f7f1f",
					700: "#1c741c",
					800: "#1a681a",
					900: "#175d17",
					950: "#145214",
				},
			},
			fontFamily: {
				heading: ["Montserrat", "sans-serif"],
				body: ["Open Sans", "sans-serif"],
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
