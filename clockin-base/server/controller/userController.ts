/**
 * Controller for user sessions
 * - verifyInitialIDs: Check IDs from request body for 1st step
 */

import type { Request, Response, NextFunction } from 'express';

interface UserController {
	verifyInitialIDs: (
		req: Request,
		res: Response,
		next: NextFunction
	) => Promise<void>;
}

const userController: UserController = {
	verifyInitialIDs: async (req, res, next) => {
		console.log('🔵 Running verifyInitialIDs middleware...');
		try {
			const { employeeID, companyID } = await req.body;
			if (!employeeID || !companyID) {
				return next({
					log: '🔴 Missing Required Credentials',
					status: '401',
					message: '🔴 Missing Required Credentials',
				});
			}
			res.locals.credentials = {
				employeeID,
				companyID,
			};
			console.log(
				`✅ Successfully verify credentials. Sending to Database...`
			);
			return next();
		} catch (error) {
			return next({
				log: error,
				status: 500,
				message: '🔴 Could not verify credentials.',
			});
		}
	},
};

export default userController;