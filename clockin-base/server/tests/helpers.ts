import type { Request } from 'express';

//---CLEAN UP TASKS---//

/**
 * A helper to cleanup a mocked Module
 * @param {string} module Module path to clean up (Relative path)
 * @returns {void}
 */
export const cleanUpModule = (module: string): void => {
	vi.doUnmock(module);
	vi.resetModules();
};

/**
 * A helper to perform clean up before and after a test file runs
 */
export const cleanUpTest = () => {
	vi.resetAllMocks();
	vi.restoreAllMocks();
	vi.resetModules();
};

//---//

//---GENERATE BAD REQUEST LIST TASK---//

/**
 * A helper to create a list of bad request query, params or body based on a list of input keys and values. ONLY USE THIS FUNCTION FOR TESTING MULTIPLE TEST CASES WITH each().
 * @param {Record<string, unknown>} originReq The original Request
 * @param {string[]} keys A list of keys to add in or change their values
 * @param {unknown[]} values A list of new values to assign to a key
 * @returns {Record<string, unknown>[]} An array of new object or an error message in the same format (Array of an object containing an error message)
 */
export const makeList = (
	keys: string[],
	values: unknown[],
	originReq: Record<string, unknown>
): Record<string, unknown>[] => {
	// Safety checks
	if (keys.length < 1) return [{ Error: "🔴 Missing 'keys' input." }];
	if (values.length < 1) return [{ Error: "🔴 Missing 'values' input." }];
	// Return this output at the end
	const output: Record<string, unknown>[] = [];
	// Loop through keys array
	keys.forEach((key) => {
		for (let i = 0; i < values.length; i++) {
			// Copy the origin object then create a new property or replace the value of current key
			const newList = {
				...originReq,
				[key]: values[i],
			};

			// Push the new object into output
			output.push(newList);
		}
	});
	return output;
};

//---//

//---GENERATE BAD REQUEST LIST TASK---//

/**
 * A helper to create a list of bad request object. This function use makeList to create preliminary request queries, params or bodies then later transform them to request objects. makeReqList will always takes in an original body, queries and params are optional. Returns a list of request objects. ONLY USE THIS FUNCTION FOR TESTING MULTIPLE TEST CASES WITH each().
 * @param {string[]} keys A list of keys to change their values
 * @param {unknown[]} values A list of new values to assign to a key
 * @param {Record<string, unknown>} [originBody] The original request body
 * @param {Record<string, unknown>} [originQuery] The original request query
 * @param {Record<string, unknown>} [originParams] The original request params
 * @returns {Request[]} An array of new request objects or an error message in the same format (Array of an object containing an error message)
 */
export const makeReqList = (
	keys: string[],
	values: unknown[],
	originBody?: Record<string, unknown>,
	originQuery?: Record<string, unknown>,
	originParams?: Record<string, unknown>
): Request[] => {
	// Return this output at the end.
	// Typecast to Request here for the accurate return type for the Request object
	const output = [] as unknown as Request[];

	let badBodies: Record<string, unknown>[] = [];
	let badQueries: Record<string, unknown>[] = [];
	let badParams: Record<string, unknown>[] = [];
	
	if (originBody) badBodies = makeList(keys, values, originBody);
	if (originQuery) badQueries = makeList(keys, values, originQuery);
	if (originParams) badParams = makeList(keys, values, originParams);

	const newReq: Record<string, unknown> = {};
	// Transform each body into a request object and push each of them to output
	badBodies.forEach((body) => {
		const newReq = {
			body: body,
		} as unknown as Request;

		output.push(newReq);
	});

	return output;
};
