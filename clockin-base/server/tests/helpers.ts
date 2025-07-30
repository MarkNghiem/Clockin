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

//---GENERATE BAD REQUEST BODY LIST TASK---//

/**
 * A helper to create a list of bad request body based on a list of input keys and values. ONLY USE THIS FUNCTION FOR TESTING MULTIPLE TEST CASES WITH each().
 * @param {string[]} keys A list of keys to change their values
 * @param {Record<string, unknown>} originObject The original object
 * @param {unknown[]} values A list of new values to assign to a key
 * @returns {Record<string, unknown>[]} An array of new object or an error message in the same format (Array of an object containing an error message)
 */
export const makeBadBodyList = (
	keys: string[],
	originObject: Record<string, unknown>,
	values: unknown[]
): Record<string, unknown>[] => {
	// Safety checks
	if (keys.length < 1) return [{ Error: "🔴 Missing 'keys' input." }];
	if (values.length < 1) return [{ Error: "🔴 Missing 'values' input." }];
	// Return this output at the end
	const output: Record<string, unknown>[] = [];
	// Loop through keys array
	keys.forEach((key) => {
		for (let i = 0; i < values.length; i++) {
			// Copy the origin object then createa new property or replace the value of current key
			const newReqBody = {
				...originObject,
				[key]: values[i],
			};

			// Push the new object into output
			output.push(newReqBody);
		}
	});
	return output;
};

//---//

//---GENERATE BAD REQUEST LIST TASK---//

/**
 * A helper to create a list of bad request object. This function use makeBadBodyList to create preliminary request bodies then later transform them to request objects. Returns a list of request objects. ONLY USE THIS FUNCTION FOR TESTING MULTIPLE TEST CASES WITH each().
 * @param {string[]} keys A list of keys to change their values
 * @param {Record<string, unknown>} bodyObject The original request object
 * @param {unknown[]} values A list of new values to assign to a key
 * @returns {Request[]} An array of new request objects or an error message in the same format (Array of an object containing an error message)
 */
export const makeBadReqList = (
	keys: string[],
	bodyObject: Record<string, unknown>,
	values: unknown[]
): Request[] => {
	// Return this output at the end.
	// Typecast to Request here for the accurate return type for the Request object
	const output = [] as unknown as Request[];
	// Call makeBadBodyList callback to get the body data first
	const badBodies = makeBadBodyList(keys, bodyObject, values);

	// Transform each body into a request object and push each of them to output
	badBodies.forEach((body) => {
		const newReq = {
			body: body,
		} as unknown as Request;

		output.push(newReq);
	});

	return output;
};
