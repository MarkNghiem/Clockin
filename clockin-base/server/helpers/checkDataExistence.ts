import type { Request } from 'express';

/**
 * Type for the Returned Object from checkDataExistence
 * @property { string } message - Message for Devs and Users
 * @property { Record<string, unknown> | null } data - A record of passed or bad data
 * @property { number } [originalCount] - A count of received data
 * @property { number } [count] - A count of passed or bad data. Cannot be the combination of both
 * @property { boolean } [isMissing] - True if there is a bad data
 */
export interface Report {
	message: string;
	data: Record<string, unknown> | null;
	originalCount?: number;
	count?: number;
	isMissing?: boolean;
}

/**
 * A helper used to check the request data's existence. Return a report of missing data
 * @param {Request['query'] | Request['params'] | Record<string, unknown>} data Takes in Request Query, Params or Body
 * @returns {Report} Returns a report of missing data
 */
const checkDataExistence = (
	data: Request['query'] | Request['params'] | Record<string, unknown>
): Report => {
	// Exit early if data is empty
	if (!Object.keys(data).length)
		return {
			message: 'No Data Found',
			data: null,
		};

	// This one will be used if there are bad data
	const badData: Record<string, unknown> = {};
	// This one will be used if all data passed the check. Won't be return if there are a bad data
	const verified: Record<string, unknown> = {};
	// True if there are any bad data
	let isMissing: boolean = false;

	// Loop through data object
	for (const key in data) {
		// If there is no value at the current key, turn isMissing to true then create a prop for badData with the corresponding key
		if (!data[key]) {
			isMissing = true;
			badData[key] = data[key];
			// Otherwise, create a prop for verified with the corresponding key
		} else {
			verified[key] = data[key];
		}
	}

	// If isMissing is true then return the Report with bad data
	if (isMissing)
		return {
			message: '🔴 Detected Missing Data.',
			data: badData,
			originalCount: Object.keys(data).length,
			count: Object.keys(badData).length,
			isMissing,
		};
	// Otherwise, return the Report with verified data
	else
		return {
			message: '✅ All Inputted Data Successfully Verified',
			data: verified,
			originalCount: Object.keys(data).length,
			count: Object.keys(verified).length,
			isMissing,
		};
};

export default checkDataExistence;
