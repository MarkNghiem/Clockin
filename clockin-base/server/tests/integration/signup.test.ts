import request from 'supertest';

import { app } from '../../server';

import type { Response } from 'supertest';

describe('Testing Sign Up Integration Routes...', () => {
	beforeAll(() => {
		vi.restoreAllMocks();
	
	});

	afterAll(() => {
		vi.restoreAllMocks();
	});

	describe('POST /signup', () => {
		const route: string = '/p1/user/signup';
		const initialCredential = {
			employeeID: '7e8e8597-e4af-4d24-bfc8-90c6daa101fe',
			companyID: '88a9a4db-ec34-4ec2-b907-d5d70a9b7779',
		};

		describe('Success Checks.', () => {
			let res: Response;
			beforeAll(async () => {
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
				'Should response with an error if employeeID or companyID value is falsy.',
				async (badCredentials) => {
					const res = await request(app)
						.post(route)
						.send(badCredentials);

					expect(res.status).toBe(401);
					expect(res.body.error).toMatch('Unauthorized');
				}
			);
		});
	});
});
