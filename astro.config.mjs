import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	trailingSlash: "never",
	site: "https://walkcoloradosprings.com",
	// prefetch: true,
	compressHTML: true,
	image: {
		domains: ["jp7lua9fr7kk.walkcoloradosprings.com"],
		remotePatterns: [{ protocol: "https" }],
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
