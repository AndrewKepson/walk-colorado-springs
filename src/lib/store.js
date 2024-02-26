import {
	getAllWordPressPages,
	getWordPressPageBySlug,
	getAllWordPressPosts,
	getWordPressPostBySlug,
} from "./wordPressAPI";

export const siteUrl = import.meta.env.SITE;

export const useWordPressAPI = {
	getAllWordPressPages,
	getWordPressPageBySlug,
	getAllWordPressPosts,
	getWordPressPostBySlug,
};
