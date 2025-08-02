/**
 * Router for user session related
 * - /signup: Initial sign up step;
 *
 */

import express from 'express';
import * as z from 'zod';

import dataTypeController from '../controller/dataTypeController';
import userController from '../controller/userController';
import supabaseController from '../controller/supabaseController';

const userRouter = express.Router();

userRouter.post(
	'/signup',
	dataTypeController.validateType({
		body: z.object({
			employeeID: z.uuidv4(),
			companyID: z.uuidv4(),
		}),
	}),
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

userRouter.post(
	'/signup/:eid/:cid/',
	dataTypeController.validateType({
		params: z.object({
			eid: z.uuidv4(),
			cid: z.uuidv4(),
		}),
		body: z.object({
			firstName: z.string(),
			lastName: z.string(),
			userID: z.string(),
			email: z.email(),
			password: z.string(),
		}),
	}),
	userController.verifySignUpData,
	(_req, res) => {
		res.status(200).json({
			message: '✅ Successfully created a new account.',
		});
	}
);

export default userRouter;
