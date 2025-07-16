import { jest } from '@jest/globals';

import userController from '../../controller/userController';

import type { Request, Response } from 'express';

describe('Testing userController middlewares', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		jest.restoreAllMocks();
	});

	afterEach(() => {
		jest.resetAllMocks();
		jest.restoreAllMocks();
	});

	describe('verifyInitialIDs middleware.', () => {
		const req = {
			body: {
				employeeID: '7e8e8597-e4af-4d24-bfc8-90c6daa101fe',
				companyID: '88a9a4db-ec34-4ec2-b907-d5d70a9b7779',
			},
		} as unknown as Request;
		const res = { locals: {} } as unknown as Response;
		const next = jest.fn();
		it('Should move on to next middleware if everything passes.', async () => {
			await userController.verifyInitialIDs(req, res, next);

			expect(res.locals.credentials).toEqual({
				employeeID: '7e8e8597-e4af-4d24-bfc8-90c6daa101fe',
				companyID: '88a9a4db-ec34-4ec2-b907-d5d70a9b7779',
			});
			expect(next).toHaveBeenCalledWith();
		});

		const badReqs = [
			{
				body: {
					employeeID: null,
					companyID: '88a9a4db-ec34-4ec2-b907-d5d70a9b7779',
				},
			},
			{
				body: {
					employeeID: undefined,
					companyID: '88a9a4db-ec34-4ec2-b907-d5d70a9b7779',
				},
			},
			{
				body: {
					employeeID: '',
					companyID: '88a9a4db-ec34-4ec2-b907-d5d70a9b7779',
				},
			},
			{
				body: {
					employeeID: '7e8e8597-e4af-4d24-bfc8-90c6daa101fe',
					companyID: null,
				},
			},
			{
				body: {
					employeeID: '7e8e8597-e4af-4d24-bfc8-90c6daa101fe',
					companyID: undefined,
				},
			},
			{
				body: {
					employeeID: '7e8e8597-e4af-4d24-bfc8-90c6daa101fe',
					companyID: '',
				},
			},
		] as unknown as Request[];

		it.each(badReqs)(
			'Should response with a 401 status code when either credential is missing.',
			async (badReqs) => {
				await userController.verifyInitialIDs(badReqs, res, next);

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
				get Body() {
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
});
