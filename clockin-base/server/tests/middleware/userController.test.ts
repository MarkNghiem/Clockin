import userController from '../../controller/userController';
import { cleanUpTest, makeBadReqList } from '../helpers';

import type { Request, Response } from 'express';

describe('Testing userController middlewares', () => {
	beforeAll(() => {
		cleanUpTest();
	});

	afterAll(() => {
		cleanUpTest();
	});

	describe('verifyInitialIDs middleware.', () => {
		const req = {
			body: {
				employeeID: '7e8e8597-e4af-4d24-bfc8-90c6daa101fe',
				companyID: '88a9a4db-ec34-4ec2-b907-d5d70a9b7779',
			},
		} as unknown as Request;
		const res = { locals: {} } as unknown as Response;
		const next = vi.fn();

		it('Request body should contain both IDs', () => {
			expect(req.body).toHaveProperty('employeeID');
			expect(req.body.employeeID).toBeDefined();
			expect(req.body).toHaveProperty('companyID');
			expect(req.body.companyID).toBeDefined();
		});

		it('Should move on to next middleware if everything passes.', async () => {
			await userController.verifyInitialIDs(req, res, next);

			expect(res.locals.credentials).toEqual({
				employeeID: '7e8e8597-e4af-4d24-bfc8-90c6daa101fe',
				companyID: '88a9a4db-ec34-4ec2-b907-d5d70a9b7779',
			});
			expect(next).toHaveBeenCalledWith();
		});

		const bodyKeys = Object.keys(req.body);
		const badReqs = makeBadReqList(bodyKeys, req.body, [
			null,
			undefined,
			'',
		]);

		it.each(badReqs)(
			'Should response with a 401 status code when either credential is missing.',
			async (badReqs) => {
				await userController.verifyInitialIDs(badReqs, res, next);
				console.log('Testing this Bad Request~~ ', badReqs);

				expect(next).toHaveBeenCalledWith(
					expect.objectContaining({
						log: expect.stringContaining('Missing'),
						status: 401,
						message: expect.objectContaining({
							error: expect.stringContaining('Unauthorized'),
						}),
					})
				);
			}
		);

		it('Should response with a 500 status code if the middleware failed.', async () => {
			const badReq = {
				get body() {
					throw new Error('Failed');
				},
			} as unknown as Request;

			await userController.verifyInitialIDs(badReq, res, next);

			expect(next).toHaveBeenCalledWith(
				expect.objectContaining({
					log: expect.stringContaining('verifyInitialIDs'),
					status: 500,
					message: expect.objectContaining({
						error: expect.stringContaining('Internal Server Error'),
					}),
				})
			);
		});
	});

	describe('verifySignUpData middleware.', () => {
		const req = {
			body: {
				firstName: 'John',
				lastName: 'Doe',
				userID: 'JohnDoe123',
				email: 'JohnDoe123@gmail.com',
				password: 'HelloWorld6789!@',
			},
			params: {
				eid: '7e8e8597-e4af-4d24-bfc8-90c6daa101fe',
				cid: '88a9a4db-ec34-4ec2-b907-d5d70a9b7779',
			},
		} as unknown as Request;
		const res = { locals: {} } as unknown as Response;
		const next = vi.fn();

		it('Request Body should contain all required information', () => {
			expect(req.body).toHaveProperty('firstName');
			expect(req.body.firstName).toBeDefined();
			expect(req.body).toHaveProperty('lastName');
			expect(req.body.lastName).toBeDefined();
			expect(req.body).toHaveProperty('userID');
			expect(req.body.userID).toBeDefined();
			expect(req.body).toHaveProperty('email');
			expect(req.body.email).toBeDefined();
			expect(req.body).toHaveProperty('password');
			expect(req.body.password).toBeDefined();
		});

		it('Request should contain 2 parameters: eid and cid', () => {
			expect(req.params).toHaveProperty('eid');
			expect(req.params.eid).toBeDefined();
			expect(req.params).toHaveProperty('cid');
			expect(req.params.cid).toBeDefined();
		});

		it('Should move on to the next middleware if everything passes', async () => {
			await userController.verifySignUpData(req, res, next);

			expect(next).toHaveBeenCalledWith();
		});

		let keys = Object.keys(req.body);
		let badReqs = makeBadReqList(keys, req.body, [null, undefined, '']);

		it.each(badReqs)(
			'Should response with a 400 status code and a corresponding message when one or more fields are missing',
			async (badReqs) => {
				await userController.verifySignUpData(badReqs, res, next);
				console.log('Testing this bad request~~ ', badReqs);

				expect(next).toHaveBeenCalledWith(
					expect.objectContaining({
						log: expect.stringContaining('Missing'),
						status: 400,
						message: expect.objectContaining({
							error: expect.stringContaining('Bad Request'),
						}),
					})
				);
			}
		);

		keys = Object.keys(req.params);
		badReqs = makeBadReqList(keys, req.params, ['123', 'abc', '']);

		it.each(badReqs)(
			'Should response with a 400 status code and a corressponding message when incorrect or missing either eid or cid',
			async (badReqs) => {
				await userController.verifySignUpData(badReqs, res, next);
				console.log('Testing this bad request~~ ', badReqs);

				expect(next).toHaveBeenCalledWith(
					expect.objectContaining({
						log: expect.stringContaining('Missing'),
						status: 400,
						message: expect.objectContaining({
							error: expect.stringContaining('Bad Request'),
						}),
					})
				);
			}
		);

		badReqs = makeBadReqList(['firstName, lastName'], req.body, [
			'John ',
			' John',
			'J o h n',
			'John1',
			'1John',
			'J0hn',
			'John!',
			'@John',
			'J@hn',
		]);

		it.each(badReqs)(
			'Should response with a 400 status code and a corresponding message when firstName or lastName contains whitespaces, numbers or special characters',
			async (badReqs) => {
				await userController.verifySignUpData(badReqs, res, next);
				console.log('Testing this bad request~~ ', badReqs);

				expect(next).toHaveBeenCalledWith(
					expect.objectContaining({
						log: expect.stringContaining('invalid character'),
						status: 400,
						message: expect.objectContaining({
							error: expect.stringContaining('Bad Request'),
						}),
					})
				);
			}
		);

		badReqs = makeBadReqList(['emails'], req.body, [
			'JohnDoe123email.com',
			'JohnDoe123@emailcom',
			'JohnDoe123emailcom',
			'John Doe 123 @ gmail . com',
		]);

		it.each(badReqs)(
			'Should response with a 400 status code and a corresponding message when email is invalid',
			async (badReqs) => {
				await userController.verifySignUpData(badReqs, res, next);
				console.log('Testing this bad request~~', badReqs);

				expect(next).toHaveBeenCalledWith(
					expect.objectContaining({
						log: expect.stringContaining('Invalid Email'),
						status: 400,
						message: expect.objectContaining({
							error: expect.stringContaining('Bad Request'),
						}),
					})
				);
			}
		);

		badReqs = makeBadReqList(['password'], req.body, [
			'helloworld789!',
			'HELLOWORLD789!',
			'HelloWorld!',
			'HelloWorld789',
			'Hello World 789 !',
		]);

		it.each(badReqs)(
			'Should response with a 400 status code and a corresponding messsage when password does not contain all of the following: At least 16 characters, Uppercase letter, Lowercase letter, Numbers, At least 1 Special Character or Containing Whitespaces',
			async (badReqs) => {
				await userController.verifySignUpData(badReqs, res, next);
				console.log('Testing this bad request~~ ', badReqs);

				expect(next).toHaveBeenCalledWith(
					expect.objectContaining({
						log: expect.stringContaining('Unqualified Password'),
						status: 400,
						message: expect.objectContaining({
							error: expect.stringContaining('Bad Request'),
						}),
					})
				);
			}
		);

		it('Should response with a 500 status code if the middleware failed', async () => {
			const badReq = {
				get body() {
					throw new Error('Error');
				},
			} as unknown as Request;

			await userController.verifySignUpData(badReq, res, next);

			expect(next).toHaveBeenCalledWith(
				expect.objectContaining({
					log: 'verifySignUpData',
					status: 500,
					message: expect.objectContaining({
						error: expect.stringContaining('Internal Server Error'),
					}),
				})
			);
		});
	});
});
