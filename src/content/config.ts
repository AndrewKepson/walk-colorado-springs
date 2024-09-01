import { defineCollection } from "astro:content";
import { getAllWalks } from "@lib/wordPressAPI";
import { walkSchema } from "./wordPressSchemas";

export const walksCollection = defineCollection({
	schema: walkSchema,
	loader: async () => {
		const walks = await getAllWalks();
		return walks.map((walk) => ({
			id: walk.id,
			...walk,
		}));
	},
});

export const collections = {
	walks: walksCollection,
};
