import * as z from 'zod';

import type { DataTypeController } from '../types/types';
import type { Request, Response, NextFunction } from 'express';

const dataTypeController: DataTypeController = {
	validateType: (schema) => {
		return async (req, res, next) => {
			console.log('Validating Received Data using Inputted Schemas...');
			try {
				if (schema.query) {
					const validatedData = schema.query.safeParse(req.query);
					if (!validatedData.success) {
						return next({
							log: '🔴 Invalid Type from Request Query.',
							status: 400,
							message: {
								error: '🔴 TypeError: Please check your input or contact an administrator.',
							},
						});
					}

          req.query = validatedData.success;
				}

				if (schema.params) {
					const validatedData = schema.params.safeParse(req.params);
					if (!validatedData.success) {
						return next({
							log: '🔴 Invalid Type from Request Parameters.',
							status: 400,
							message: {
								error: '🔴 TypeError: Please check your input or contact an administrator.',
							},
						});
					}
				}

				if (schema.body) {
					const validatedData = schema.body.safeParse(req.body);
					if (!validatedData.success) {
						return next({
							log: '🔴 Invalid Type from Request Query.',
							status: 400,
							message: {
								error: '🔴 TypeError: Please check your input or contact an administrator.',
							},
						});
					}
				}
			} catch (error) {}
		};
	},
};

export default dataTypeController;
