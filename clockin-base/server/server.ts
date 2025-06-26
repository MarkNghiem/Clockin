import express, { type Request, type Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

// Import from other files
import connectDB from './db/db';
import { currentDir, config } from './config';

const app = express();

// Express configurations
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Config for DB
connectDB();

// Connect to port 3000
const PORT = 3000;

const server = app.listen(PORT, () => {
	try {
		const checked = config.checkData(config.MODE);
		if (checked[0]) {
			console.log(`✅ Server is running on PORT ${PORT}.`);
			console.log(`🔵 Mode: ${checked[0]}.`);
		} else {
			console.warn(`🟡 Server is running but no environment found.`);
		}
	} catch (error) {
		console.error(error);
		throw new Error("Unable to connect to the server.");
	}
});

// Serving static files
app.use(express.static(path.resolve(currentDir, '../src/')));

// Default endpoints
app.get('/p1', (_req, res) => {
	res.status(200).sendFile(path.resolve(currentDir, '../index.html'));
});

app.use((_req, res) => {
	res.status(404).json('This is not the page you are looking for');
});

// Global error handler
app.use((err: Error, _req: Request, res: Response) => {
	const defaultErr = {
		log: '🔴 Unknown middleware error.',
		status: 500,
		message: 'An unknown error occurred.',
	};

	const errorObj = Object.assign({}, defaultErr, err);
	console.error(errorObj.log);
	res.status(errorObj.status).json(errorObj.message);
});

// Gracefully shutting down
let isShuttingDown = false;

export const gracefullyShutDown = async () => {
	if (isShuttingDown) return;
	isShuttingDown = true;
	
	try {
		console.log('🔵 Shut down signal received. Gracefully shutting down...');
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

export default app;