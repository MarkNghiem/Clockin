import type { Request, Response, NextFunction } from 'express';

export interface ErrorObj {
	log: string;
	status: number;
	message: Record<string, unknown>;
}

export interface UserController {
	verifyInitialIDs: (
		req: Request,
		res: Response,
		next: NextFunction
	) => Promise<void>;

	verifySignUpData: (
		req: Request,
		res: Response,
		next: NextFunction
	) => Promise<void>;
}

export interface SupabaseController {
	verifyInitialIDs: (
		req: Request,
		res: Response,
		next: NextFunction
	) => Promise<void>;
}
