// Walk Data types
export interface MapImage {
	url: string;
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

export interface FlattenedWalk extends Omit<WalkNode, "walkFields"> {
	date: string;
	miles: number;
	walkNumber: number;
	mapImage: MapImage;
}
