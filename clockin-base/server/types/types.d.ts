import type { Request, Response, NextFunction } from 'express';
import * as z from 'zod';

/** Type for Error Objects. Received by next(). */
export interface ErrorObj {
	log: string;
	status: number;
	message: Record<string, unknown>;
}

/** Type for checkRequestController. */
export interface CheckRequestController {
	/** Check if the request has the correct headers. Usually Content-Type: application/json. */
	validateHeader: (req: Request, res: Response, next: NextFunction) => void;
	/** Check existences and formats of received Initial IDs. */
	validateExistence: (req: Request, res: Response, next: NextFunction) => void;
	/** Validate Data at compiling and runtime */
	validateType: (schema: {
		query?: z.ZodObject;
		params?: z.ZodObject;
		body?: z.ZodObject;
	}) => (req: Request, res: Response, next: NextFunction) => void;
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
