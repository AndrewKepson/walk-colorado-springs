// General Types
export interface PageInfo {
	hasNextPage: boolean;
	endCursor: string | null;
}

export interface Edge<T> {
	node: T;
	cursor: string;
}

export interface PaginatedResponse<T> {
	edges: Edge<T>[];
	pageInfo: PageInfo;
}

export interface QueryResult<T> {
	[key: string]: PaginatedResponse<T>;
}

// Walk Data types
export interface MapImage {
	url: string;
	altText: string;
}

export interface Photo {
	id: string;
	sourceUrl: string;
	altText: string;
}

export interface WalkFields {
	date: string;
	miles: number;
	walkNumber: number;
	mapImage: {
		node: {
			sourceUrl: string;
			altText: string;
		};
	};
	area: string;
	neighborhood: string;
	content: string;
	photos: {
		edges: {
			node: Photo;
		}[];
	};
}

export interface WalkNode {
	id: string;
	title: string;
	walkFields: WalkFields;
}

export interface WalkEdge {
	node: WalkNode;
}

export interface WalksData {
	walks: {
		edges: WalkEdge[];
	};
}
export interface FlattenedWalk {
	id: string;
	title: string;
	date: string;
	miles: number;
	walkNumber: number;
	mapImage: MapImage;
	area: string;
	neighborhood: string;
	content: string;
	photos: Photo[];
}

export interface FlattenedWalk extends Omit<WalkNode, "walkFields"> {
	date: string;
	miles: number;
	walkNumber: number;
	mapImage: MapImage;
}
