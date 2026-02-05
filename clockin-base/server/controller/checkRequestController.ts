import * as z from 'zod';

import checkDataExistence from '../helpers/checkDataExistence';

import type { Report } from '../helpers/checkDataExistence';
import type { CheckRequestController } from '../types/types';

const checkRequestController: CheckRequestController = {
	// Check requests' header type
	validateHeader: (req, res, next) => {
		console.log('🔵 Running validateHeader middleware...');
		try {
			if (!req.is('applilcation/json')) {
				return next({
					log: '🔴 Request Content Type is not JSON | checkRequestController > validateHeader.',
					status: 415,
					message: {
						error: 'UNSUPPORTED_MEDIA_TYPE',
						message: '🔴 Request format is unsupported.'
					}
				})
			}
		} catch (error) {
			return next({
				log: `${error} | checkRequestController > validateHeader.`,
				status: 500,
				message: {
					error: 'INTERNAL_SERVER_ERROR'
				}
			})
		}
	},

	// Checking received Request data's existence
	validateExistence: (req, _res, next) => {
		console.log('🔵 Running validateExistence middleware...');
		try {
			const result: Record<string, Report> = {
				query: checkDataExistence(req.query),
				params: checkDataExistence(req.params),
				body: checkDataExistence(req.body),
			};

			// Loop through result Object
			for (const key in result) {
				// If there are no data at current key, log a message to the console
				if (!result[key].data)
					console.log(`${result[key].message} at ${key}`);
				// Otherwise, run this block
				else {
					// If a data is missing, send a response with a 400 status code and a message
					if (result[key].isMissing) {
						return next({
							log: `${result[key].message} at ${key} | checkRequestController > validateExistence.`,
							status: 404,
							message: `${result[key].message}`,
						});
						// Otherwise, log a success message to the console then move on to the next key
					} else console.log(`${result[key].message} at ${key}`);
				}
			}

			// Move on to the next middleware if all received data successfully passed the check
			return next();
		} catch (error) {
			return next({
				log: `🔴 ${error} | checkRequestController > verifyExistence.`,
				status: 500,
				message: '🔴 Internal Server Error.',
			});
		}
	},

	// Checking queries, params and bodies' types before moving on. This middleware uses the provided schemas in routers
	validateType: (schema) => {
		return (req, _res, next) => {
			console.log(
				'🔵 Validating Received Data using Inputted Schemas...'
			);
			try {
				// Declared keys here for type compatibility when iterating through schemas
				const keys = ['query', 'params', 'body'] as const;
				// Loop through schema Object
				for (const key of keys) {
					// If schema is not provided, skip to the next schema
					if (!schema[key]) {
						console.log(`🔵 No ${key} Provided.`);
						continue;
					}

					// Parse Request data with provided schema
					const validatedData = schema[key].safeParse(req[key]);
					// If the type does not match, send a response with a 400 status code and a message
					if (!validatedData.success) {
						return next({
							log: `
									🔴 Invalid Type from ${key}:\n
									${z.treeifyError(validatedData.error)}.\n
									| checkRequestController > verifyExistence.
								`,
							status: 400,
							message:
								'🔴 TypeError - Please check your input or contact an administrator.',
						});
					}
				}

				// If 0 schema are provided, send a response with a 500 status code
				// By default, schemas should be provided in the route by the devs
				// If this block runs, check the route to see if you have provided a schema
				if (!Object.keys(schema).length) {
					return next({
						log: '🔴 No Schema Found | dataTypeController > validateType.',
						status: 500,
						message:
							'🔴 Internal Server Error. Please contact Administrator.',
					});
				}
				
				 return next();
			} catch (error) {
				return next({
					log: `🔴 ${error} | dataTypeController > validateType.`,
					status: 500,
					message:
						'🔴 Internal Server Error. Please contact Administrator',
				});
			}
		};
	},
};

export default checkRequestController;
