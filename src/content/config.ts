import { defineCollection, z } from "astro:content";
import { getAllWalks } from "@lib/wordPressAPI";

const walkSchema = z.object({
	id: z.string(),
	title: z.string(),
	date: z.string(),
	miles: z.number(),
	walkNumber: z.number(),
	mapImage: z.object({
		url: z.string(),
		altText: z.string(),
	}),
});

// Define the Walks collection
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
