import dotenv from "dotenv";

dotenv.config();

import { type PaginatedResponse, type QueryResult, type FlattenedWalk, type WalksData } from "./wordPressAPI.types";

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

const paginatedQuery = async <T, U = T>(
	queryGenerator: (cursor: string | null) => string,
	dataTransformer: (node: T) => U,
	limit: number = Infinity,
	batchSize: number = 100
): Promise<U[]> => {
	let allItems: U[] = [];
	let cursor: string | null = null;
	let hasMore = true;

	const fetchBatch = async (): Promise<PaginatedResponse<T> | null> => {
		const query = queryGenerator(cursor);
		const data = await fetchWordPressAPI<QueryResult<T>>(query, { cursor });
		const queryKey = Object.keys(data)[0];
		return data[queryKey] || null;
	};

	while (hasMore && allItems.length < limit) {
		try {
			const response = await fetchBatch();
			if (!response) break;

			const newItems = response.edges.map((edge) => dataTransformer(edge.node));
			allItems = [...allItems, ...newItems];
			cursor = response.pageInfo.endCursor;
			hasMore = response.pageInfo.hasNextPage;

			console.log(`Fetched ${newItems.length} items, total: ${allItems.length}, hasNextPage: ${hasMore}`);

			if (allItems.length >= limit) {
				console.log(`Limit of ${limit} reached or exceeded.`);
				break;
			}
		} catch (error) {
			console.error("Failed to fetch items:", error);
			break;
		}
	}

	console.log(`Fetched a total of ${allItems.length} items.`);

	// Truncate the array if it exceeds the limit
	if (allItems.length > limit) {
		allItems = allItems.slice(0, limit);
	}

	return allItems;
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

// export const getAllWalks = async (): Promise<FlattenedWalk[]> => {
// 	const data = await fetchWordPressAPI<WalksData>(`
//     {
//       walks {
//         edges {
//           node {
//             id
//             title(format: RENDERED)
//             walkFields {
//               date
//               miles
//               walkNumber
//               mapImage {
//                 node {
//                   sourceUrl
//                   altText
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   `);

// 	if (!data?.walks?.edges) {
// 		console.error("Unexpected data structure:", data);
// 		return [];
// 	}

// 	return data.walks.edges.map(({ node }) => {
// 		const { walkFields, ...rest } = node;
// 		const { mapImage, ...otherWalkFields } = walkFields;
// 		return {
// 			...rest,
// 			...otherWalkFields,
// 			mapImage: {
// 				url: mapImage.node.sourceUrl,
// 				altText: mapImage.node.altText,
// 			},
// 		};
// 	});
// };

export const getAllWalks = async (limit: number = Infinity): Promise<FlattenedWalk[]> => {
	const walkQuery = (cursor: string | null) => `
    query GetAllWalks($cursor: String) {
      walks(first: 100, after: $cursor) {
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
          cursor
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;

	const walkTransformer = (node: any): FlattenedWalk => {
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
	};

	return paginatedQuery<any, FlattenedWalk>(walkQuery, walkTransformer, limit);
};
