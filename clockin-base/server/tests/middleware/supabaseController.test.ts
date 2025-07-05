import { jest } from '@jest/globals';

import { config } from '../../config';
import connectDB from '../../db/db';
import supabaseController from '../../controller/supabaseController';

import type { Request, Response } from 'express';

describe('Testing supabaseController middlewares...', () => {
	let supabaseAdmin: Awaited<ReturnType<typeof connectDB>>;

  beforeAll(async () => {
    const checked = config.checkData([config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE]);
    supabaseAdmin = await connectDB(checked[0], checked[1]);
  })
  beforeEach(() => {
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
					employeeID: '7e8e8597-e4af-4d24-bfc8-90c6daa101fe',
					companyID: '88a9a4db-ec34-4ec2-b907-d5d70a9b7779',
				},
			},
		} as unknown as Response;
		const next = jest.fn();

    it('Should return with one set of data and move on to the next middleware if everything passes.', async () => {
      await supabaseController.verifyInitialIDs(req, res, next);

      expect(res.locals).toHaveProperty('data');
      expect(res.locals.data).toHaveLength(1);
      expect(next).toHaveBeenCalledWith();
    })

    it('Should response with a correct status code and message when a query to the database failed.');

    it('Should response with a 404 status code if no data were returned.');

    it('Should response with a 500 status code if there are more than 1 result.');

    it('Should response with a 500 status code if the middleware failed.');
	});
});
