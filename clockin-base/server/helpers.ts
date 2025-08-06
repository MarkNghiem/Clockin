import type { Request } from 'express';

interface Report {
	message: string;
	count: number;
	data: Record<string, unknown>;
	isMissing: boolean;
}

/**
 * A helper used to check the request data's existence. Return a report of missing data
 * @param {Request['query'] | Request['params'] | Record<string, unknown>} data Takes in Request Query, Params or Body
 * @returns {Report} Returns a report of missing data
 */
export const checkDataExistence = (
	data: Request['query'] | Request['params'] | Record<string, unknown>
): Report => {
	const keys = Object.keys(data);
	const badData: Record<string, unknown> = {};
	const verified: Record<string, unknown> = {};
	let isMissing: boolean = false;

	for (let i = 0; i < keys.length; i++) {
		if (!data[keys[i]]) {
			isMissing = true;
			badData[keys[i]] = data[keys[i]];
		} else {
			verified[keys[i]] = data[keys[i]];
		}
	}
	if (isMissing)
		return {
			message: '🔴 Detected Missing Data.',
			count: Object.keys(badData).length,
			data: badData,
			isMissing,
		};
	else
		return {
			message: '✅ All Inputted Data Successfully Verified',
			count: Object.keys(verified).length,
			data: verified,
      isMissing
		};
};
