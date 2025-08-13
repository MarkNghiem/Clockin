import * as z from 'zod';

import checkDataExistence from '../helpers/checkDataExistence';

import type { Report } from '../helpers/checkDataExistence';
import type { CheckRequestController } from '../types/types';

const checkRequestController: CheckRequestController = {
	// Checking received Request data's existence
	validateExistence: (req, _res, next) => {
		console.log('🔵 Running verifyExistence middleware...');
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
							log: `${result[key].message} at ${key} | checkRequestController > verifyExistence.`,
							status: 404,
							message: `${result[key].message}`,
						});
						// Otherwise, log a success message to the console then move on to the next key
					} else console.log(`${result[key].message} at ${key}`);
				}
			}

			// Move on to the next middleware if all received data successfullt passed the check
			return next();
		} catch (error) {
			return next({
				log: `🔴 ${error} | checkRequestController > verifyExistence.`,
				status: 500,
				message: '🔴 Internal Server Error.',
			});
		}
	},

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

	// verifyInitialIDs: async (req, res, next) => {
	// 	console.log('🔵 Running verifyInitialIDs middleware...');
	// 	try {
	// 		const { employeeID, companyID } = req.body;
	// 		if (!employeeID || !companyID) {
	// 			return next({
	// 				log: '🔴 Missing Required Credentials. userController > verifyInitialIDs.',
	// 				status: 401,
	// 				message: {
	// 					error: '🔴 Unauthorized Request. Missing Required Credentials',
	// 				},
	// 			});
	// 		}

	// 		res.locals.credentials = {
	// 			employeeID,
	// 			companyID,
	// 		};

	// 		console.log(
	// 			`✅ Successfully received credentials. Sending to Database...`
	// 		);
	// 		return next();
	// 	} catch (error) {
	// 		return next({
	// 			log: `🔴 ${error} | userController > verifyInitialIDs.`,
	// 			status: 500,
	// 			message: {
	// 				error: '🔴 Internal Server Error. Could not verify credentials.',
	// 			},
	// 		});
	// 	}
	// },

	// verifySignUpData: async (req, res, next) => {
	// 	console.log('Running verifySignUpData middleware...');
	// 	try {
	// 		const { eid, cid } = req.params;

	// 		// Check for existences
	// 		if (!eid || !cid) {
	// 			return next({
	// 				log: '🔴 Missing Required Parameters | userController > verifySignUpData.',
	// 				status: 400,
	// 				message: {
	// 					error: '🔴 Bad Request. Missing Required Parameters.',
	// 				},
	// 			});
	// 		}

	// 		const { firstName, lastName, userID, email, password } = req.body;
	// 		if (!firstName || !lastName || !userID || !email || !password) {
	// 			return next({
	// 				log: '🔴 Missing one or multiple Required Field(s) | userController > verifySignUpData.',
	// 				status: 400,
	// 				message: {
	// 					error: '🔴 bad Request. Missing one or multiple Required Field(s).',
	// 				},
	// 			});
	// 		}

	// 		// Check for data format
	// 		// firstName and lastName should not contain whitespaces, numbers and special characters
	// 		if (/[\s\d\W]/.test(firstName) || /[\s\d\W]/.test(lastName)) {
	// 			return next({
	// 				log: '🔴 First Name or/and Last Name contains invalid character(s).',
	// 				status: 400,
	// 				message: {
	// 					error: '🔴 Bad Request. First Name and/or Last Name contains invalid character(s).',
	// 				},
	// 			});
	// 		}

	// 		// Email Address should be in correct format
	// 		if (/[^A-Za-z0-9@._]/.test(email) || /\s/.test(email)) {
	// 			return next({
	// 				log: '🔴 Invalid Email Format.',
	// 				status: 400,
	// 				message: {
	// 					error: '🔴 Bad Request. Invalid Email Format.',
	// 				},
	// 			});
	// 		}

	// 		// Passwords should contain all of the following:
	// 		// - At least 16 characters;
	// 		// - At least 1 Uppercase letters;
	// 		// - At least 1 Lowercase letters;
	// 		// - At least 1 Numbers;
	// 		// - At least 1 Special Characters;
	// 		// - Does not contain Whitespaces

	// 		if (
	// 			password.length < 16 ||
	// 			/[^A-Za-z0-9`~!@#$%^&*()-_=+[\]{}\\;:,<.>/?]/.test(password) ||
	// 			/\s/.test(password)
	// 		) {
	// 			return next({
	// 				// Log is messy yeah I know
	// 				log: `
	// 					🔴 Unqualified Password | userController > verifySignUpData.
	// 					${
	// 						password.length < 16
	// 							? 'Need at least 16 characters.'
	// 							: /[^A-Z]/.test(password)
	// 								? 'Need at least 1 Uppercase Letter.'
	// 								: /[^a-z]/.test(password)
	// 									? 'Need at least 1 Lowercase Letter.'
	// 									: /[^0-9]/.test(password)
	// 										? 'Need at least 1 Number.'
	// 										: /[^`~!@#$%^&*()-_=+[\]{}\\;:,<.>/?]/.test(
	// 													password
	// 											  )
	// 											? 'Need at least 1 Special Character.'
	// 											: /\s/.test(password)
	// 												? 'Cannot contain whitespace.'
	// 												: 'Uncaught Error.'
	// 					}
	// 				`,
	// 				status: 400,
	// 				message: {
	// 					error: '🔴 Unqualified Password. Please make sure it meets all requirements.',
	// 				},
	// 			});
	// 		}

	// 		res.locals.data = {
	// 			eid,
	// 			cid,
	// 			firstName,
	// 			lastName,
	// 			userID,
	// 			email,
	// 			password,
	// 		};

	// 		console.log(
	// 			'✅ Successfully verified data. Sending to database...'
	// 		);
	// 		return next();
	// 	} catch (error) {
	// 		return next({
	// 			log: `🔴 ${error} | userController > verifySignUpData.`,
	// 			status: 500,
	// 			message: {
	// 				error: '🔴 Internal Server Error. Could not verify received data.',
	// 			},
	// 		});
	// 	}
	// },
};

export default checkRequestController;
