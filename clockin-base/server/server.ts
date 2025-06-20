import express, { type Request, type Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

// Config for env mode
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Express configurations
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Config for DB
const supabaseURL = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseURL || !supabaseKey) {
	console.error('🔴 Database URL and Key are not set.');
	throw new Error('🔴 Missing Database Credentials.');
}

try {
	createClient(supabaseURL, supabaseKey);
	console.log('✅ Successfully Established Connection to the Database.');
} catch (error) {
	console.error(`🔴 Unable to connect to the Database: ${error}.`);
}

// Connect to port 3000
const PORT = 3000;

const server = app.listen(PORT, () => {
	console.log(`✅ Server is running on PORT ${PORT}.`);
	console.log(`🔵 Mode: ${process.env.NODE_ENV}.`);
});

// Serving static files
app.use(express.static(path.resolve(__dirname, '../src/')));

// Default endpoints
app.get('/p1', (_req, res) => {
	res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
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

const gracefullyShutDown = async () => {
	if (isShuttingDown) return;
	isShuttingDown = true;
	console.log('🔵 Shut down signal received. Gracefully shutting down...');

	try {
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
