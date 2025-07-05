import express from 'express';
import path from 'path';

// Import from other files
import connectDB from './db/db';
import { app, PORT, currentDir, config } from './config';

// Import types
import type { Request, Response, NextFunction } from 'express';
import type { ErrorObj } from './types/types';

// Routers
import userRouter from './routes/userRouter';

const server = app.listen(PORT, async () => {
	try {
		const checked = config.checkData([config.MODE]);
		if (checked[0]) {
			console.log(`✅ Server is running on PORT ${PORT}.`);
			console.log(`🔵 Mode: ${checked[0]}.`);
		} else {
			console.warn(`🟡 Server is running but no environment found.`);
		}
	} catch (error) {
		console.error(error);
		throw new Error('🔴 Unable to connect to the server.');
	}
});

const checked = config.checkData([
	config.SUPABASE_URL,
	config.SUPABASE_SERVICE_ROLE,
]);

export const supabaseAdmin = await connectDB(checked[0], checked[1]);

// Serving static files
app.use(express.static(path.resolve(currentDir, '../src/')));

// Use Routers
app.use('/p1/user', userRouter);

// Default endpoints
app.get('/p1', (_req, res) => {
	res.status(200).sendFile(path.resolve(currentDir, '../index.html'));
});

app.use((_req, res) => {
	res.status(404).json('This is not the page you are looking for');
});

// Global error handler
app.use(
	(
		err: ErrorObj,
		_req: Request,
		res: Response,
		_next: NextFunction
	) => {
		const defaultErr = {
			log: '🔴 Unknown middleware error.',
			status: 500,
			message: { error: '🔴 An unknown error occurred.' },
		};

		const errorObj = Object.assign({}, defaultErr, err);
		console.error(err.log);
		res.status(errorObj.status).json(errorObj.message);
	}
);

// Gracefully shutting down
let isShuttingDown = false;

export const gracefullyShutDown = async () => {
	if (isShuttingDown) return;
	isShuttingDown = true;

	try {
		console.log(
			'🔵 Shut down signal received. Gracefully shutting down...'
		);
		await new Promise<void>((resolve, reject) => {
			server.close((err) => {
				if (err) reject(err);
				resolve();
			});
		});
		console.log('✅ Server has been successfully shutting down');
		process.exitCode = 0;
	} catch (error) {
		console.log(`🔴 Unable to gracefully shut down. Force exiting...`);
		console.error(error);
		process.exitCode = 1;
	}
};

// Shutdown signals
process.on('SIGINT', gracefullyShutDown);
process.on('SIGTERM', gracefullyShutDown);
