/**
 * Controller for user sessions
 * - verifyInitialIDs: Check IDs from request body for 1st step
 */

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
