import checkRequestController from '../../controller/userController';
import { cleanUpTest, makeReqList } from '../helpers';

import type { Request, Response } from 'express';

describe('Testing checkRequestController middlewares', () => {
	beforeAll(() => cleanUpTest());
	afterAll(() => cleanUpTest());

	describe('validateExistence middleware', () => {
		const req = {
			body: {
				a: 'a',
				b: 'b',
			},
		} as unknown as Request;
		const res = { locals: {} } as unknown as Response;
		const next = vi.fn();

		it('Request body should contain both IDs', () => {
			expect(req.body).toHaveProperty('a');
			expect(req.body.a).toBeDefined();
			expect(req.body).toHaveProperty('b');
			expect(req.body.b).toBeDefined();
		});

		it('Should move on to next middleware if everything passes.', () => {
			checkRequestController.validateExistence(req, res, next);

			expect(next).toHaveBeenCalledWith();
		});

		const bodyKeys = Object.keys(req.body);
		const badReqs = makeReqList(bodyKeys, [null, undefined, ''], req.body);

		it.each(badReqs)(
			'Should response with a 404 status code when either credential is missing.',
			(badReqs) => {
				checkRequestController.validateExistence(badReqs, res, next);
				console.log('Testing this Bad Request~~ ', badReqs);

				expect(next).toHaveBeenCalledWith(
					expect.objectContaining({
						log: expect.stringContaining('Missing'),
						status: 404,
						message: expect.objectContaining({
							error: expect.stringContaining('Missing'),
						}),
					})
				);
			}
		);

		it('Should response with a 500 status code if the middleware failed.', () => {
			const badReq = {
				get body() {
					throw new Error('Failed');
				},
			} as unknown as Request;

			checkRequestController.validateExistence(badReq, res, next);

			expect(next).toHaveBeenCalledWith(
				expect.objectContaining({
					log: expect.stringContaining('checkRequestExistence'),
					status: 500,
					message: expect.objectContaining({
						error: expect.stringContaining('Internal Server Error'),
					}),
				})
			);
		});
	});

	describe('validateType middleware.', () => {
		const req = {} as unknown as Request;
		const res = { locals: {} } as unknown as Response;
		const next = vi.fn();

		it('Should check all data in Request with provided schemas');
	});
});
