import request from 'supertest';

import { supabaseAdmin } from '../../db/db';

import type { Response } from 'supertest';
import type { Express } from 'express';

const route: string = '/p1/user/signup';
const initialCredential = {
	employeeID: '7e8e8597-e4af-4d24-bfc8-90c6daa101fe',
	companyID: '88a9a4db-ec34-4ec2-b907-d5d70a9b7779',
};

const mockHelper = async (mockModule: string, importModule: string) => {
	vi.doMock(mockModule, () => ({
		verifyInitialIDs: vi.fn((_req, _res, next) => {
			return next({
				log: '🔴 Error',
				status: 500,
				message: {
					error: '🔴 Error',
				},
			});
		}),
	}));

	const badServer = await import(importModule);
	const badApp = badServer.app;
	return await request(badApp).post(route).send(initialCredential);
};

const reset = (mockModule: string) => {
	vi.doUnmock(mockModule);
	vi.resetModules();
};

describe('Testing Sign Up Integration Routes...', () => {
	beforeAll(() => {
		vi.restoreAllMocks();
		vi.resetAllMocks();
	});

	afterAll(() => {
		vi.restoreAllMocks();
		vi.resetAllMocks();
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
			const badCredentials = [
				{
					employeeID: null,
					companyID: '88a9a4db-ec34-4ec2-b907-d5d70a9b7779',
				},
				{
					employeeID: undefined,
					companyID: '88a9a4db-ec34-4ec2-b907-d5d70a9b7779',
				},
				{
					employeeID: '',
					companyID: '88a9a4db-ec34-4ec2-b907-d5d70a9b7779',
				},
				{
					employeeID: '7e8e8597-e4af-4d24-bfc8-90c6daa101fe',
					companyID: null,
				},
				{
					employeeID: '7e8e8597-e4af-4d24-bfc8-90c6daa101fe',
					companyID: undefined,
				},
				{
					employeeID: '7e8e8597-e4af-4d24-bfc8-90c6daa101fe',
					companyID: '',
				},
			];

			it.each(badCredentials)(
				'Should response with an error with a 401 status code if employeeID or companyID value is falsy.',
				async (badCredentials) => {
					const server = await import('../../server');
					const app = server.app;
					const res = await request(app)
						.post(route)
						.send(badCredentials);

					expect(res.status).toBe(401);
					expect(res.body.error).toMatch('Unauthorized');
				}
			);

			it('Should response with an error when encountered a server error', async () => {
				let badRes = await mockHelper(
					'../../controller/userController',
					'../../server'
				);

				expect(badRes.status).toBe(500);
				expect(badRes.body.error).toMatch('Error');

				reset('../../controller/userController');

				badRes = await mockHelper(
					'../../controller/supabaseController',
					'../../server'
				);

				expect(badRes.status).toBe(500);
				expect(badRes.body.error).toMatch('Error');

				reset('../../controller/supabaseController');
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
			let badKeys = [
				'firstName',
				'lastName',
				'userID',
				'email',
				'password',
			];
			let badReqBody: Record<string, string | null>[] = badKeys.map(
				(badKey) => ({
					...reqBody,
					[badKey]: null,
				})
			);

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

					expect(badRes.status).toBe(400);
					expect(badRes.body.error).toMatch('Bad Request');
				}
			);

			badKeys = ['firstName', 'lastName'];
			badReqBody = badKeys.map((badKey) => ({
				...reqBody,
				[badKey]: null,
			}));

			it(
				'Should response with an error if firstName or lastName contain special characters or numbers'
			);
			it('Should response with an error if email does not contain @');
			it(
				'Should Response with an error if password does not contain letters, numbers and special characters'
			);
			it('Should response with an error when encountered a server error');
		});
	});
});
