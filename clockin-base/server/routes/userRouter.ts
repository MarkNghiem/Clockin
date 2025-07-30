/**
 * Router for user session related
 * - /signup: Initial sign up step;
 *
 */

import express from 'express';

import userController from '../controller/userController';
import supabaseController from '../controller/supabaseController';

const userRouter = express.Router();

userRouter.post(
	'/signup',
	userController.verifyInitialIDs,
	supabaseController.verifyInitialIDs,
	(_req, res) => {
		res.status(200).json({
			message: '✅ Data found with corresponding IDs.',
			data: {
				companyName: res.locals.data.companies.company_name,
			},
		});
	}
);

userRouter.post('/signup/:eid/:cid/', userController.verifySignUpData, (_req, res) => {
	res.status(200).json({
		message: '✅ Successfully created a new account.',
	});
});

export default userRouter;
