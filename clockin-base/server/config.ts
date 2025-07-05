import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// DotENV config
const envPath =
	process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev';
dotenv.config({ path: envPath });

export const app = express();

// Express config
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Database config

// Port config
export const PORT = 3000;

const currentFile = fileURLToPath(import.meta.url);
export const currentDir = dirname(currentFile);

export const config = {
	MODE: process.env.NODE_ENV,
	FRONT_PORT: process.env.FRONT_PORT,
	BACK_PORT: process.env.BACK_PORT,
	SUPABASE_PASSWORD: process.env.SUPABASE_PASSWORD,
	SUPABASE_TRANSACTION_POOL_URL: process.env.SUPABASE_TRANSACTION_POOL_URL,
	SUPABASE_URL: process.env.SUPABASE_URL,
	SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
	SUPABASE_SERVICE_ROLE: process.env.SUPABASE_SERVICE_ROLE,
	SUPABASE_JWT_SECRET_KEY: process.env.SUPABASE_JWT_SECRET_KEY,

	/**
	 * Check each param if there are any data
	 * @param {(string | undefined)[]} keys Name of variables that need to be checked
	 * @returns {string[]} An array of checked items. The values corresponded with the order of inputted variables. If there are no data, an empty array will be returned
	 */
	checkData(keys: (string | undefined)[]): string[] {
		const checked: string[] = [];
		keys.forEach((key) => {
			if (!key) {
				console.error('🔴 Missing enviroment data');
				throw new Error('🔴 Missing enviroment data');
			}
			return checked.push(key);
		});
		return checked;
	},
};
