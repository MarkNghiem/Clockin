import supabaseController from '../../controller/supabaseController';
import { mockSupabaseAdmin } from '../__mocks__/mocks';

import type { Request, Response } from 'express';
import type * as ServerType from '../../server';
import type { MockSupabaseAdmin } from '../__mocks__/mockTypes';

describe('Testing supabaseController middlewares...', () => {
	let mockedModule: typeof ServerType;
	let supabaseAdmin: MockSupabaseAdmin;
	
	beforeAll(async () => {
		vi.resetAllMocks();
		vi.doMock('../../server', () => ({
			supabaseAdmin: mockSupabaseAdmin,
		}));
		console.log('✅ Modules Mocked.');
		
		mockedModule = await import('../../server');
		supabaseAdmin = mockedModule.supabaseAdmin as unknown as MockSupabaseAdmin;
	});
	
	afterAll(() => {
		vi.doUnmock('../../server');
		console.log('✅ Module Unmocked.');

		vi.resetAllMocks();
	})

	describe('verifyInitialIDs middleware.', () => {
		const req = {} as unknown as Request;
		const res = {
			locals: {
				credentials: {
					employeeID: '123',
					companyID: 'abc',
				},
			},
		} as unknown as Response;
		const next = vi.fn();

		it('Should return with one set of data and move on to the next middleware if everything passes.', async () => {
			supabaseAdmin.verifyInitialIDs.mockResolvedValueOnce({
				data: [{ companies: { company_name: 'xyz' } }],
				error: null,
			});

			await supabaseController.verifyInitialIDs(req, res, next);

			expect(res.locals).toHaveProperty('data');
			expect(res.locals.data).toHaveLength(1);
			expect(res.locals.data).toEqual([
				{ companies: { company_name: 'xyz' } },
			]);
			expect(next).toHaveBeenCalledWith();
		});

		it('Should response with a correct status code and message when a query to the database failed.', async () => {
			supabaseAdmin.verifyInitialIDs.mockResolvedValueOnce({
				data: null,
				error: {
					message: 'Error.',
					code: '400',
					detail: 'Error detail.',
				},
			});

			await supabaseController.verifyInitialIDs(req, res, next);

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

		it('Should response with a 404 status code if no data were returned.', async () => {
			supabaseAdmin.verifyInitialIDs.mockResolvedValueOnce({
				data: null,
				error: null,
			});

			supabaseAdmin.verifyInitialIDs.mockResolvedValueOnce({
				data: [{ companies: null }],
				error: null,
			});

			await supabaseController.verifyInitialIDs(req, res, next);

			expect(next).toHaveBeenCalledWith(
				expect.objectContaining({
					log: expect.stringContaining('No Data Found'),
					status: expect(404),
					message: expect.objectContaining({
						error: expect.stringContaining('No Data Found'),
					}),
				})
			);

			await supabaseController.verifyInitialIDs(req, res, next);

			expect(next).toHaveBeenCalledWith(
				expect.objectContaining({
					log: expect.stringContaining('No Data Found'),
					status: expect(404),
					message: expect.objectContaining({
						error: expect.stringContaining('No Data Found'),
					}),
				})
			);
		});

		it('Should response with a 500 status code if there are more than 1 result.', async () => {
			supabaseAdmin.verifyInitialIDs.mockResolvedValueOnce({
				data: [{ prop1: 1 }, { prop2: 2 }],
				error: null,
			});

			await supabaseController.verifyInitialIDs(req, res, next);

			expect(next).toHaveBeenCalledWith(
				expect.objectContaining({
					log: expect.stringContaining('Unexpected'),
					status: expect(500),
					message: expect.objectContaining({
						error: expect.stringContaining('Unexpected'),
					}),
				})
			);
		});

		it('Should response with a 500 status code if the middleware failed.', async () => {
			const badReq = {
				get Body() {
					throw new Error('Failed');
				},
			} as unknown as Request;

			await supabaseController.verifyInitialIDs(badReq, res, next);

			expect(next).toHaveBeenCalledWith(
				expect.objectContaining({
					log: expect.stringContaining('Failed'),
					status: expect(500),
					message: expect.objectContaining({
						error: expect.stringContaining('Internal Server Error'),
					}),
				})
			);
		});
	});
});