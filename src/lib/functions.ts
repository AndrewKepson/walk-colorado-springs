// * Utility Functions
export function sortArrayObjectsByProperty(arr, property) {
	if (!arr || !arr.every((element) => element.hasOwnProperty(property))) {
		throw new Error(`Every element must have the property '${property}'`);
	}

	return arr.sort((a, b) => {
		let propA = a[property];
		let propB = b[property];

		return propA.localeCompare(propB);
	});
}

export function sortEdgesByTitle(edges) {
	if (!edges || !edges.every((edge) => edge.node && edge.node.title)) {
		throw new Error("Each edge must have a node with a title");
	}

	return edges.sort((a, b) => {
		let titleA = a.node.title.toLowerCase();
		let titleB = b.node.title.toLowerCase();
		return titleA.localeCompare(titleB);
	});
}

/**
 * Formats a date string from ISO 8601 format to a more readable format.
 * @param dateString - A date string in the format "YYYY-MM-DDTHH:mm:ss+00:00"
 * @returns A formatted date string in the format "Month DD, YYYY"
 */
export function formatWalkDate(dateString: string): string {
	const date = new Date(dateString);

	// Check if the date is valid
	if (isNaN(date.getTime())) {
		throw new Error("Invalid date string provided");
	}

	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: "UTC", // Ensure consistent output regardless of local timezone
	};

	return date.toLocaleDateString("en-US", options);
}

// Example usage:
// const formattedDate = formatWalkDate("2024-08-30T00:00:00+00:00");
// console.log(formattedDate); // Output: "August 30, 2024"
