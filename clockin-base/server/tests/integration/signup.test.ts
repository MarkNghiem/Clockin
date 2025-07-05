import request from 'supertest';

import { gracefullyShutDown } from '../../server';
import { app } from '../../config';

import type { Response } from 'supertest';

describe('Testing Sign Up Integration Routes', () => {
	afterAll(async () => {
		await gracefullyShutDown();
	});

	describe('POST /signup', () => {
		describe('Success Checks', () => {
			const initialCredential = {
				employeeID: '7e8e8597-e4af-4d24-bfc8-90c6daa101fe',
				companyID: '88a9a4db-ec34-4ec2-b907-d5d70a9b7779',
			};

			let res: Response;
			beforeAll(async () => {
				res = await request(app)
					.post('/p1/user/signup')
					.send(initialCredential);
			});
      
			it('Should respond with a 200 status code and a JSON object.', () => {
        console.log(res.body);
				expect(res.status).toEqual(200);
				expect(res.type).toMatch(/json/);
				expect(res.body).toBeDefined();
			});

			it('Response body should contain a message and a data object', () => {
				expect(res.body).toHaveProperty('message');
				expect(res.body.message).toMatch('Data found');
				expect(res.body).toHaveProperty('data');
			});

			it('Returned data should contain "companyName" property and have a value', () => {
				expect(res.body.data).toHaveProperty('companyName');
				expect(res.body.data.companyName).toBeTruthy();
			});
		});

		describe('Failures Checks', () => {
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

			it('Should response with an error if employeeID is null', async () => {
				const res = await request(app)
					.post('/p1/user/signup')
					.send(badCredentials[0]);

				expect(res.status).toBe(401);
				expect(res.body.error).toMatch('Unauthorized');
			});

			it('Should response with an error if employeeID is undefined', async () => {
				const res = await request(app)
					.post('/p1/user/signup')
					.send(badCredentials[1]);

				expect(res.status).toBe(401);
				expect(res.body.error).toMatch('Unauthorized');
			});

			it('Should response with an error if employeeID is empty', async () => {
				const res = await request(app)
					.post('/p1/user/signup')
					.send(badCredentials[2]);

				expect(res.status).toBe(401);
				expect(res.body.error).toMatch('Unauthorized');
			});

			it('Should response with an error if companyID is null', async () => {
				const res = await request(app)
					.post('/p1/user/signup')
					.send(badCredentials[3]);

				expect(res.status).toBe(401);
				expect(res.body.error).toMatch('Unauthorized');
			});

			it('Should response with an error if companyID is undefined', async () => {
				const res = await request(app)
					.post('/p1/user/signup')
					.send(badCredentials[4]);

				expect(res.status).toBe(401);
				expect(res.body.error).toMatch('Unauthorized');
			});

			it('Should response with an error if companyID is empty', async () => {
				const res = await request(app)
					.post('/p1/user/signup')
					.send(badCredentials[5]);
        
        console.log(res.body)
				expect(res.status).toBe(401);
				expect(res.body.error).toMatch('Unauthorized');
			});
		});
	});
});
