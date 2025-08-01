import type { UserController } from '../types/types';

const userController: UserController = {
	verifyInitialIDs: async (req, res, next) => {
		console.log('🔵 Running verifyInitialIDs middleware...');
		try {
			const { employeeID, companyID } = req.body;
			if (!employeeID || !companyID) {
				return next({
					log: '🔴 Missing Required Credentials. userController > verifyInitialIDs.',
					status: 401,
					message: {
						error: '🔴 Unauthorized Request. Missing Required Credentials',
					},
				});
			}

			res.locals.credentials = {
				employeeID,
				companyID,
			};

			console.log(
				`✅ Successfully received credentials. Sending to Database...`
			);
			return next();
		} catch (error) {
			return next({
				log: `🔴 ${error} | userController > verifyInitialIDs.`,
				status: 500,
				message: {
					error: '🔴 Internal Server Error. Could not verify credentials.',
				},
			});
		}
	},

	verifySignUpData: async (req, res, next) => {
		console.log('Running verifySignUpData middleware...');
		try {
			const { eid, cid } = req.params;

			// Check for existences
			if (!eid || !cid) {
				return next({
					log: '🔴 Missing Required Parameters | userController > verifySignUpData.',
					status: 400,
					message: {
						error: '🔴 Bad Request. Missing Required Parameters.',
					},
				});
			}

			const { firstName, lastName, userID, email, password } = req.body;
			if (!firstName || !lastName || !userID || !email || !password) {
				return next({
					log: '🔴 Missing one or multiple Required Field(s) | userController > verifySignUpData.',
					status: 400,
					message: {
						error: '🔴 bad Request. Missing one or multiple Required Field(s).',
					},
				});
			}

			// Check for data format
			// firstName and lastName should not contain whitespaces, numbers and special characters
			if (/[\s\d\W]/.test(firstName) || /[\s\d\W]/.test(lastName)) {
				return next({
					log: '🔴 First Name or/and Last Name contains invalid character(s).',
					status: 400,
					message: {
						error: '🔴 Bad Request. First Name and/or Last Name contains invalid character(s).',
					},
				});
			}

			// Email Address should be in correct format
			if (/[^A-Za-z0-9@._]/.test(email) || /\s/.test(email)) {
				return next({
					log: '🔴 Invalid Email Format.',
					status: 400,
					message: {
						error: '🔴 Bad Request. Invalid Email Format.',
					},
				});
			}

			// Passwords should contain all of the following:
			// - At least 16 characters;
			// - At least 1 Uppercase letters;
			// - At least 1 Lowercase letters;
			// - At least 1 Numbers;
			// - At least 1 Special Characters;
			// - Does not contain Whitespaces

			if (
				password.length < 16 ||
				/[^A-Za-z0-9`~!@#$%^&*()-_=+[\]{}\\;:,<.>/?]/.test(password) ||
				/\s/.test(password)
			) {
				return next({
					// Log is messy yeah I know
					log: `
						🔴 Unqualified Password | userController > verifySignUpData.
						${
							password.length < 16
								? 'Need at least 16 characters.'
								: /[^A-Z]/.test(password)
									? 'Need at least 1 Uppercase Letter.'
									: /[^a-z]/.test(password)
										? 'Need at least 1 Lowercase Letter.'
										: /[^0-9]/.test(password)
											? 'Need at least 1 Number.'
											: /[^`~!@#$%^&*()-_=+[\]{}\\;:,<.>/?]/.test(
														password
												  )
												? 'Need at least 1 Special Character.'
												: /\s/.test(password)
													? 'Cannot contain whitespace.'
													: 'Uncaught Error.'
						}
					`,
					status: 400,
					message: {
						error: '🔴 Unqualified Password. Please make sure it meets all requirements.',
					},
				});
			}

			res.locals.data = {
				eid,
				cid,
				firstName,
				lastName,
				userID,
				email,
				password,
			};

			console.log(
				'✅ Successfully verified data. Sending to database...'
			);
			return next();
		} catch (error) {
			return next({
				log: `🔴 ${error} | userController > verifySignUpData.`,
				status: 500,
				message: {
					error: '🔴 Internal Server Error. Could not verify received data.',
				},
			});
		}
	},
};

export default userController;
