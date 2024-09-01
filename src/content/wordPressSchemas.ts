import { z } from "astro:content";

export const walkSchema = z.object({
	id: z.string(),
	title: z.string(),
	date: z.string().optional(),
	miles: z.number().optional(),
	walkNumber: z.number().optional(),
	mapImage: z
		.object({
			url: z.string(),
			altText: z.string(),
		})
		.optional(),
	area: z.string().optional(),
	neighborhood: z.string().optional(),
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
