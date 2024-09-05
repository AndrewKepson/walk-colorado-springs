import { type FlattenedWalk } from "./wordPressAPI.types";

// * Utility Functions

// * Format Date from walkDate
/**
 * Formats a date string from ISO 8601 format to a more readable format.
 * @param dateString - A date string in the format "YYYY-MM-DDTHH:mm:ss+00:00"
 * @returns A formatted date string in the format "Month DD, YYYY"
 */
export function formatWalkDate(dateString: string, outputFormat: "readable" | "ISO" = "readable"): string {
	const date = new Date(dateString);

	if (isNaN(date.getTime())) {
		throw new Error("Invalid date string provided");
	}

	if (outputFormat === "ISO") {
		return date.toISOString().split("T")[0];
	} else {
		const options: Intl.DateTimeFormatOptions = {
			year: "numeric",
			month: "long",
			day: "numeric",
			timeZone: "UTC",
		};

		return date.toLocaleDateString("en-US", options);
	}
}

// Example usage:
// const formattedDate = formatWalkDate("2024-08-30T00:00:00+00:00");
// console.log(formattedDate); // Output: "August 30, 2024"

// * Get formatted walk URI
/**
 * Generates a URI for a walk based on its number and date.
 * @param walkNumber - The number of the walk
 * @param walkDate - The date of the walk (in any format that can be parsed by Date constructor)
 * @returns A string representing the URI for the walk
 */
export function getWalkURI(walkNumber: number, walkDate: string): string {
	try {
		const formattedDate = formatWalkDate(walkDate, "ISO");
		return `/walks/${walkNumber}/${formattedDate}`;
	} catch (error) {
		console.error(`Error generating walk URI: ${error.message}`);
		// Fallback to a safe URI if date formatting fails
		return `/walks/${walkNumber}/invalid-date`;
	}
}

// Usage examples:
// const uri = getWalkURI(5, "2023-05-15");  // Returns "/walks/5/2023-05-15"
// const uri2 = getWalkURI(10, "May 20, 2023");  // Returns "/walks/10/2023-05-20"

// * Get Total Miles from allWalks
/**
 * Calculates the total miles walked from an array of WalkData.
 * @param walks - An array of WalkData objects
 * @returns The sum of miles walked, rounded to two decimal places
 */
export function getTotalMilesWalked(walks: FlattenedWalk[]): number {
	const totalMiles = walks.reduce((sum, walk) => sum + walk.miles, 0);
	return Number(totalMiles.toFixed(2)); // Round to two decimal places
}

// * Get Number of Walks from allWalks
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
