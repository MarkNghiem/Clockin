import type { Request, Response } from 'express';
import { mockSupabaseAdmin } from '../__mocks__/mocks';

describe('Testing supabaseController middlewares...', () => {
	describe('verifyInitialIDs middleware.', () => {
		const req = {} as unknown as Request;
		const res = {
			locals: {
				credentials: {
					employeeID: '7e8e8597-e4af-4d24-bfc8-90c6daa101fe',
					companyID: '88a9a4db-ec34-4ec2-b907-d5d70a9b7779',
				},
			},
		} as unknown as Response;
		const next = vi.fn();

		it('Should return with one set of data and move on to the next middleware if everything passes.', async () => {
			const { default: supabaseController } = await import(
				'../../controller/supabaseController'
			);

			await supabaseController.verifyInitialIDs(req, res, next);

			expect(res.locals).toHaveProperty('data');
			expect(res.locals.data).toEqual({
				companies: { company_name: "John's Company" },
			});
			expect(next).toHaveBeenCalledWith();
		});

		it('Should response with a 404 status code and message when a query to the database failed.', async () => {
			const badRes = {
				locals: {
					credentials: {
						employeeID: 'abc',
						companyID: '123',
					},
				},
			} as unknown as Response;
			const { default: supabaseController } = await import(
				'../../controller/supabaseController'
			);

			await supabaseController.verifyInitialIDs(req, badRes, next);

			expect(next).toHaveBeenCalledWith(
				expect.objectContaining({
					log: expect.stringContaining('Error:'),
					status: expect.any(Number),
					message: expect.objectContaining({
						error: expect.any(String),
					}),
				})
			);
		});

		it('Should response with a 500 status code if the middleware failed.', async () => {
			vi.resetModules();
			vi.doMock('../../db/db', () => ({
				supabaseAdmin: mockSupabaseAdmin,
			}));

			const { default: supabaseController } = await import(
				'../../controller/supabaseController'
			);

			await supabaseController.verifyInitialIDs(req, res, next);

			expect(next).toHaveBeenCalledWith(
				expect.objectContaining({
					log: expect.stringContaining('Error'),
					status: 500,
					message: expect.objectContaining({
						error: expect.stringContaining('Internal Server Error'),
					}),
				})
			);

			vi.doUnmock('../../db/db');
		});
	});
});
