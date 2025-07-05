/**
 * Controller for user sessions
 * - verifyInitialIDs: Check IDs from request body for 1st step
 */

import type { UserController } from "../types/types";

const userController: UserController = {
	verifyInitialIDs: async (req, res, next) => {
		console.log('🔵 Running verifyInitialIDs middleware...');
		try {
			const { employeeID, companyID } = await req.body;
			if (!employeeID || !companyID) {
				return next({
					log: '🔴 Missing Required Credentials',
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
				log: error,
				status: 500,
				message: {
					error: '🔴 Internal Server Error. Could not verify credentials.',
				},
			});
		}
	},
};

export default userController;
