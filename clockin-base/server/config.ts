import dotenv from 'dotenv';

dotenv.config();

export const config = {
	MODE: process.env.NODE_ENV,
	SUPABASE_URL: process.env.SUPABASE_URL,
	SUPABASE_PASSWORD: process.env.SUPABASE_PASSWORD,
	SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
	SUPABASE_SERVICE_ROLE: process.env.SUPABASE_SERVICE_ROLE,
	SUPABASE_JWT_SECRET_KEY: process.env.SUPABASE_JWT_SECRET_KEY,

	/**
	 * Check each param if there are any data
	 * @param {(string | undefined)[]} keys Name of variables that need to be checked
	 * @returns {string[]} An array of checked items. The values corresponded with the order of inputted variables. If there are no data, an empty array will be returned
	 */
	checkData(...keys: (string | undefined)[]): string[] {
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
