import { getCollection } from "astro:content";

export const isProduction = import.meta.env.PROD;

export const siteUrl = import.meta.env.SITE;

// Store Collections
const walksCollection = await getCollection("walks");
export const allWalks = [...walksCollection?.map((walk) => walk.data)].sort(
	(a, b) => b.walkNumber - a.walkNumber
);
