import type { Request, Response, NextFunction } from 'express';
import * as z from 'zod';

/** Type for Error Objects. Received by next(). */
export interface ErrorObj {
	log: string;
	status: number;
	message: Record<string, unknown>;
}

/** Type for userController. */
export interface CheckRequestController {
	/** Check existences and formats of received Initial IDs. */
	validateExistence: (req: Request, res: Response, next: NextFunction) => void;
	/** Validate Data at compiling and runtime */
	validateType: (schema: {
		query?: z.ZodObject;
		params?: z.ZodObject;
		body?: z.ZodObject;
	}) => (req: Request, res: Response, next: NextFunction) => void;
	// verifyInitialIDs: (
	// 	req: Request<
	// 		Record<string, unknown>,
	// 		Record<string, unknown>,
	// 		InitialIDsBody
	// 	>,
	// 	res: Response,
	// 	next: NextFunction
	// ) => Promise<void>;

	// /** Check existences and format of received sign up data. */
	// verifySignUpData: (
	// 	req: Request,
	// 	res: Response,
	// 	next: NextFunction
	// ) => Promise<void>;
}

/** Type for supabaseController. */
export interface SupabaseController {
	/** Send query to DB to check their existence before sending back a response to the client. */
	verifyInitialIDs: (
		req: Request,
		res: Response,
		next: NextFunction
	) => Promise<void>;
}
