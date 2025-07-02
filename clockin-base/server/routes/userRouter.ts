/**
 * Router for user session related
 * - /signup: Initial sign up step;
 * 
 */

import express from "express";

const userRouter = express.Router();

userRouter.post('/signup', userController.verifyInitialIDs, supabaseController.verifyInitialIDs, (req, res, next) => {
  res.status(200).json({
    message: '✅ Data found with corresponding IDs',
    data: {

    }
  })
});

export default userRouter;