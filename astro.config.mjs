import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
	integrations: [tailwind()],
	trailingSlash: "never",
	site: "https://walkcoloradosprings.com",
	// prefetch: true,
	compressHTML: true,
	image: {
		domains: ["jp7lua9fr7kk.walkcoloradosprings.com"],
		remotePatterns: [{ protocol: "https" }],
	},
});
