import * as z from 'zod';

import type { DataTypeController } from '../types/types';

const dataTypeController: DataTypeController = {
	validateType: (schema) => {
		return async (req, res, next) => {
			console.log(
				'🔵 Validating Received Data using Inputted Schemas...'
			);
			try {
				if (schema.query) {
					const validatedQuery = schema.query.safeParse(req.query);
					if (!validatedQuery.success) {
						return next({
							log: `
                🔴 Invalid Type from Request Query:\n
                ${z.treeifyError(validatedQuery.error)}.\n 
                | dataTypeController > validateType.
              `,
							status: 400,
							message: {
								error: '🔴 TypeError: Please check your input or contact an administrator.',
							},
						});
					}

					console.log(
						'✅ Verified Query.'
					);
					res.locals.validatedQuery = validatedQuery;
					return next();
				}

				if (schema.params) {
					const validatedParams = schema.params.safeParse(req.params);
					if (!validatedParams.success) {
						return next({
							log: `
                🔴 Invalid Type from Request Parameters:\n
                ${z.treeifyError(validatedParams.error)}.\n
                | dataTypeController > validateType.
              `,
							status: 400,
							message: {
								error: '🔴 TypeError: Please check your input or contact an administrator.',
							},
						});
					}

					console.log(
						'✅ Verified Parameters.'
					);
					res.locals.validatedParams = validatedParams;
					return next();
				}

				if (schema.body) {
					const validatedBody = schema.body.safeParse(req.body);
					if (!validatedBody.success) {
						return next({
							log: `
                🔴 Invalid Type from Request Query:\n
                ${z.treeifyError(validatedBody.error)}.\n
                | dataTypeController > validateType.
              `,
							status: 400,
							message: {
								error: '🔴 TypeError: Please check your input or contact an administrator.',
							},
						});
					}

					console.log(
						'✅ Verified Body.'
					);
					res.locals.validatedBody = validatedBody;
					return next();
				}

				if (!Object.entries(schema).length) {
					return next({
						log: '🔴 No Query, Params or Body found in the Request | dataTypeController > validateType.',
						status: 400,
						message: '🔴 No Data found in user Request.',
					});
				}
			} catch (error) {
				return next({
					log: `🔴 ${error} | dataTypeController > validateType.`,
					status: 500,
					message: '🔴 Internal Server Error',
				});
			}
		};
	},
};

export default dataTypeController;
