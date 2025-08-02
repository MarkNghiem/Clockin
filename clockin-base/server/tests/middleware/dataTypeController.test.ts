import * as z from 'zod';

import dataTypeController from '../../controller/dataTypeController';
import { cleanUpTest } from '../helpers';

import type { Request, Response } from 'express';

describe('Testing dataTypeController middlewares.', () => {
	beforeAll(() => cleanUpTest());
	afterAll(() => cleanUpTest());

	describe('validateType middleware.', () => {
		const ZodSchema = z.object({
			query: z.object().optional(),
			params: z.object().optional(),
			body: z.object().optional(),
		});
		type Schema = z.infer<typeof ZodSchema>;
		let schema: Schema;
		let req: Request;
		const res: Response;
		const next = vi.fn();

		it('Schemas should validate their corresponding request properties', async () => {
      await dataTypeController.validateType()
    });
		it('Should move on to the next middleware if everything passes');
	});
});

/** NOTE
 * Move dataTypeController after userController,
 * Change userController into checkRequestController,
 * checkRequestController checks for types and existence of incoming request queries, params and bodies
 * Move dataTypeController to checkRequestController too
 * Make some helpers to DRY up the Controllers
 */