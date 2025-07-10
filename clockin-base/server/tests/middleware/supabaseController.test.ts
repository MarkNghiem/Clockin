import { jest } from '@jest/globals';

import supabaseController from '../../controller/supabaseController';
import { mockSupabaseAdmin } from '../mocks/mocks';

import type { Request, Response } from 'express';
import type { MockSupabaseAdmin } from '../mocks/mockTypes';

jest.unstable_mockModule('../../server', () => ({
	supabaseAdmin: mockSupabaseAdmin,
}));
console.log('✅ Mocked Modules.');

const mockedModule = await import('../../server');
const supabaseAdmin =
	mockedModule.supabaseAdmin as unknown as MockSupabaseAdmin;

describe('Testing supabaseController middlewares...', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.resetAllMocks();
		jest.restoreAllMocks();
	});

	afterEach(() => {
		jest.resetAllMocks();
		jest.restoreAllMocks();
	});

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
		const next = jest.fn();

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

      
		});

		it(
			'Should response with a 500 status code if there are more than 1 result.'
		);

		it('Should response with a 500 status code if the middleware failed.');
	});
});

jest.unstable_unmockModule('../../server');
console.log('✅ Unmocked Modules.');
