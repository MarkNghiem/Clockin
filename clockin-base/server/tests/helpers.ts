import request from 'supertest';

//---MOCK BAD MODULE TASK---//

/**
 * A helper to mock a bad module and use supertest to send a post request
 * @param {string} mockModule The module path to mock (Relative path)
 * @param {string} mockMethodName The method name to mock
 * @param {string} importModule The module path to import (Relative path)
 * @param {string} route The route used to send request
 * @param {string} reqBody Request body
 * @returns {Promise<request.Response>} A promise of the response object
 */
export const mockBadMiddleware = async (
	mockModule: string,
	mockMethodName: string,
	importModule: string,
	route: string,
	reqBody: Record<string, unknown>
): Promise<request.Response> => {
	vi.doMock(mockModule, () => ({
		[mockMethodName]: vi.fn((_req, _res, next) => {
			return next({
				log: '🔴 Error',
				status: 500,
				message: {
					error: '🔴 Error',
				},
			});
		}),
	}));

	const server = await import(importModule);
	const app = server.app;
	
	return await request(app).post(route).send(reqBody);
};

//---//

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

//---GENERATE BAD REQUEST BODY TASK---//

/**
 * A helper to create a list of bad request body based on a list of input keys and values. ONLY USE THIS FOR TESTING MULTIPLE TEST CASES with each().
 * @param {string[]} keys A list of keys to change their values
 * @param {Record<string, unknown>} originObject The original object
 * @param {unknown[]} value A list of new values to assign to a key
 * @returns {Record<string, unknown>[]} An array of new object
 */
export const makeBadBodyList = (
	keys: string[],
	originObject: Record<string, unknown>,
	value: unknown[]
): Record<string, unknown>[] => {
	const output: Record<string, unknown>[] = [];
	keys.forEach((key) => {
		if (value.length === 1) {
			const newReqBody = {
				...originObject,
				[key]: value[0],
			};

			output.push(newReqBody);
		} else {
			for (let i = 0; i < value.length; i++) {
				const newReqBody = {
					...originObject,
					[key]: value[i],
				};

				output.push(newReqBody);
			}
		}
	});
	return output;
};

//---//
