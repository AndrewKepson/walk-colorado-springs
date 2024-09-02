import { z } from "astro:content";

export const walkSchema = z.object({
	id: z.string(),
	title: z.string(),
	date: z.string(),
	miles: z.number(),
	walkNumber: z.number(),
	mapImage: z.object({
		url: z.string(),
		altText: z.string(),
	}),
	area: z.string(),
	neighborhood: z.string(),
	content: z.string().optional(),
	photos: z
		.array(
			z.object({
				id: z.string(),
				sourceUrl: z.string(),
				altText: z.string(),
			})
		)
		.optional(),
});