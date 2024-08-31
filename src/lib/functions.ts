import { type FlattenedWalk } from "./wordPressAPI.types";

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

/**
 * Calculates the total miles walked from an array of WalkData.
 * @param walks - An array of WalkData objects
 * @returns The sum of miles walked, rounded to two decimal places
 */
export function getTotalMilesWalked(walks: FlattenedWalk[]): number {
	const totalMiles = walks.reduce((sum, walk) => sum + walk.miles, 0);
	return Number(totalMiles.toFixed(2)); // Round to two decimal places
}

/**
 * Counts the total number of walks in the WalkData array.
 * @param walks - An array of WalkData objects
 * @returns The total number of walks
 */
export function getNumberOfWalks(walks: FlattenedWalk[]): number {
	return walks.length;
}

// Example usage:
// const walks: WalkData[] = [...]; // Your array of walk data
// const totalMiles = getTotalMilesWalked(walks);
// const numberOfWalks = getNumberOfWalks(walks);
// console.log(`Total miles walked: ${totalMiles}`);
// console.log(`Number of walks: ${numberOfWalks}`);
