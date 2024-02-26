import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
	integrations: [tailwind()],
	trailingSlash: "never",
	site: "https://site.com",
	// prefetch: true,
	compressHTML: true,
});
