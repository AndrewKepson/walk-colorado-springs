import dotenv from "dotenv";

dotenv.config();

const WP_API_URL = process.env.WPGRAPHQL_ENDPOINT;

const fetchWordPressAPI = async (query, variables = {}) => {
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

export const getPageBySlug = async (slug) => {
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
