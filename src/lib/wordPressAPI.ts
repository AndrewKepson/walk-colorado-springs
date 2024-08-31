import dotenv from "dotenv";

dotenv.config();

import { type FlattenedWalk, type WalksData } from "./wordPressAPI.types";

const WP_API_URL = process.env.WPGRAPHQL_ENDPOINT;

const fetchWordPressAPI = async <T>(query: string, variables: Record<string, unknown> = {}): Promise<T> => {
	if (!WP_API_URL) {
		throw new Error("WPGRAPHQL_ENDPOINT is not set in the environment variables");
	}

	const headers = { "Content-Type": "application/json" };

	const res = await fetch(WP_API_URL, {
		method: "POST",
		headers,
		body: JSON.stringify({ query, variables }),
	});

	const json = await res.json();

	if (json.errors) {
		console.log(json.errors);
		throw new Error("Failed to fetch API");
	}

	return json.data;
};

export const getAllWordPressPages = async () => {
	const data = await fetchWordPressAPI(`
    {
      pages(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
    `);
	return data?.pages;
};

export const getWordPressPageBySlug = async (slug) => {
	const data = await fetchWordPressAPI(`
    {
      page(id: "${slug}", idType: URI) {
        id
        slug
        title
        content(format: RENDERED)
        seo {
          description
          title
          openGraph {
            image {
              url
            }
          }
        }
      }
    }
    `);
	return data?.page;
};

export const getAllWordPressPosts = async () => {
	const data = await fetchWordPressAPI(`
    {
        posts {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `);

	return data?.posts;
};

export const getWordPressPostBySlug = async (slug) => {
	const data = await fetchWordPressAPI(`
    {
        post(id: "${slug}", idType: SLUG) {
          content(format: RENDERED)
          date
          slug
          title
        }
      }
    `);

	return data?.post;
};

export const getAllWalks = async (): Promise<FlattenedWalk[]> => {
	const data = await fetchWordPressAPI<WalksData>(`
    {
      walks {
        edges {
          node {
            id
            title(format: RENDERED)
            walkFields {
              date
              miles
              walkNumber
              mapImage {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
      }
    }
  `);

	if (!data?.walks?.edges) {
		console.error("Unexpected data structure:", data);
		return [];
	}

	return data.walks.edges.map(({ node }) => {
		const { walkFields, ...rest } = node;
		const { mapImage, ...otherWalkFields } = walkFields;
		return {
			...rest,
			...otherWalkFields,
			mapImage: {
				url: mapImage.node.sourceUrl,
				altText: mapImage.node.altText,
			},
		};
	});
};
