import request from 'supertest';

import { cleanUpModule, cleanUpTest, makeBadBodyList } from '../helpers';

import type { Response } from 'supertest';
import type { Express } from 'express';

/**
 * A helper to mock a bad module and use supertest to send a post request
 * @param {string} mockModule The module path to mock (Relative path)
 * @param {string} mockMethodName The method name to mock
 * @param {string} importModule The module path to import (Relative path)
 * @param {string} route The route used to send request
 * @param {string} reqBody Request body
 * @returns {Promise<request.Response>} A promise of the response object
 */
const mockBadMiddleware = async (
	mockModule: string,
	mockMethodName: string,
	importModule: string,
	route: string,
	reqBody: Record<string, unknown>
): Promise<request.Response> => {
	vi.doMock(mockModule, () => ({
		default: {
			[mockMethodName]: vi.fn((_req, _res, next) => {
				return next({
					log: '🔴 Error',
					status: 500,
					message: {
						error: '🔴 Error',
					},
				});
			}),
		},
	}));

	const server = await import(importModule);
	const app = server.app;

	return await request(app).post(route).send(reqBody);
};

describe('Testing Sign Up Integration Routes...', () => {
	const route: string = '/p1/user/signup';
	const initialCredential = {
		employeeID: '7e8e8597-e4af-4d24-bfc8-90c6daa101fe',
		companyID: '88a9a4db-ec34-4ec2-b907-d5d70a9b7779',
	};

	beforeAll(() => {
		cleanUpTest();
	});

	afterAll(() => {
		cleanUpTest();
	});

	describe('POST /signup', () => {
		describe('Success Checks.', () => {
			let res: Response;
			beforeAll(async () => {
				const server = await import('../../server');
				const app = server.app;
				res = await request(app).post(route).send(initialCredential);
			});

			it('Should respond with a 200 status code and a JSON object.', () => {
				expect(res.status).toEqual(200);
				expect(res.type).toMatch(/json/);
				expect(res.body).toBeDefined();
			});

			it('Response body should contain a message and a data object', () => {
				expect(res.body).toHaveProperty('message');
				expect(res.body.message).toMatch('Data found');
				expect(res.body).toHaveProperty('data');
			});

			it('Returned data should contain "companyName" property and have a value.', () => {
				expect(res.body.data).toHaveProperty('companyName');
				expect(res.body.data.companyName).toBeTruthy();
			});
		});

		describe('Failures Checks.', () => {
			const keys = Object.keys(initialCredential);
			const badCredentials = makeBadBodyList(keys, initialCredential, [
				null,
				undefined,
				'',
			]);

			it.each(badCredentials)(
				'Should response with an error with a 401 status code if employeeID or companyID value is falsy.',
				async (badCredentials) => {
					const server = await import('../../server');
					const app = server.app;
					const res = await request(app)
						.post(route)
						.send(badCredentials);

					console.log('Testing this bad body~~ ', badCredentials);

					expect(res.status).toBe(401);
					expect(res.body.error).toMatch('Unauthorized');
				}
			);

			it('Should response with an error when encountered a server error', async () => {
				vi.resetModules();
				// mockBadMiddleware lives in '../helpers.ts' so we use relative path from that file
				let badRes = await mockBadMiddleware(
					'../../controller/userController',
					'verifyInitialIDs',
					'../../server',
					route,
					initialCredential
				);

				expect(badRes.status).toBe(500);
				expect(badRes.body.error).toMatch('Error');

				cleanUpModule('../../controller/userController');

				badRes = await mockBadMiddleware(
					'../../controller/supabaseController',
					'verifyInitialIDs',
					'../../server',
					route,
					initialCredential
				);

				expect(badRes.status).toBe(500);
				expect(badRes.body.error).toMatch('Error');

				cleanUpModule('../../controller/supabaseController');
			});
		});
	});

	describe.only('POST /signup/:eid/:cid', () => {
		const eid = initialCredential.employeeID;
		const cid = initialCredential.companyID;
		const reqBody = {
			firstName: 'John',
			lastName: 'Doe',
			userID: 'JohnDoe123',
			email: 'JohnDoe123@email.com',
			password: 'HelloWorld789!',
		};
		describe('Success Checks', () => {
			let res: Response;

			beforeAll(async () => {
				const server = await import('../../server');
				const app = server.app;
				res = await request(app)
					.post(`${route}/${eid}/${cid}`)
					.send(reqBody);
			});

			it('Should response with a 201 status code and a JSON object', () => {
				expect(res.status).toBe(201);
				expect(res.type).toMatch(/json/);
				expect(res.body).toBeDefined();
			});

			it('Success Responded data should only contain a message', () => {
				expect(res.body).toHaveProperty('message');
				expect(res.body.message).toMatch('Successfully');
				expect(Object.keys(res.body).length).toBe(1);
			});
		});

		describe('Failure Checks', () => {
			let app: Express;
			let badKeys = Object.keys(reqBody);
			let badReqBody = makeBadBodyList(badKeys, reqBody, [null]);

			beforeAll(async () => {
				const server = await import('../../server');
				app = server.app;
			});

			it.each(badReqBody)(
				'Should response with an error with a 400 status code if there are missing data in request body',
				async (badReqBody) => {
					const badRes = await request(app)
						.post(route)
						.send(badReqBody);

					console.log('Testing this bad body~~ ', badReqBody);

					expect(badRes.status).toBe(400);
					expect(badRes.body.error).toMatch('Bad Request');
				}
			);

			badKeys = ['firstName'];
			badReqBody = makeBadBodyList(badKeys, reqBody, [
				'John!',
				'John@',
				'John#',
			]);

			it.each(badReqBody)(
				'Should response with an error if firstName contain special characters or numbers',
				async (badReqBody) => {
					const badRes = await request(app)
						.post(route)
						.send(badReqBody);

					console.log('Testing this bad body~~ ', badReqBody);

					expect(badRes.status).toBe(400);
					expect(badRes.body.error).toMatch('Bad Request');
				}
			);

			badKeys = ['lastName'];
			badReqBody = makeBadBodyList(badKeys, reqBody, [
				'Doe!',
				'Doe@',
				'Doe#',
			]);

			it.each(badReqBody)(
				'Should response with an error if lastName contain special characters or numbers',
				async (badReqBody) => {
					const badRes = await request(app)
						.post(route)
						.send(badReqBody);

					console.log('Testing this bad body~~ ', badReqBody);

					expect(badRes.status).toBe(400);
					expect(badRes.body.error).toMatch('Bad Request');
				}
			);

			badKeys = ['email'];
			badReqBody = makeBadBodyList(badKeys, reqBody, [
				'JohnDoe123email.com',
			]);

			it.each(badReqBody)(
				'Should response with an error if email does not contain @',
				async (badReqBody) => {
					const badRes = await request(app)
						.post(route)
						.send(badReqBody);

					console.log('Testing this bad body~~ ', badReqBody);

					expect(badRes.status).toBe(400);
					expect(badRes.body.error).toMatch('Bad Request');
				}
			);

			badKeys = ['password'];
			badReqBody = makeBadBodyList(badKeys, reqBody, [
				'HelloWorld',
				'123',
				'!@#.,',
			]);

			it.each(badReqBody)(
				'Should Response with an error if password does not contain letters, numbers and special characters',
				async (badReqBody) => {
					const badRes = await request(app)
						.post(route)
						.send(badReqBody);

					console.log('Testing this bad body~~ ', badReqBody);

					expect(badRes.status).toBe(400);
					expect(badRes.body.error).toMatch('Bad Request');
				}
			);

			it('Should response with an error when encountered a server error', async () => {
				// Mock bad modules here, import them then test
			});
		});
	});
});
