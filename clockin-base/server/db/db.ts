import { createClient } from '@supabase/supabase-js';

import { config } from '../config';

import type { Database } from '../types/supabase';

const checked = config.checkData([
	config.SUPABASE_URL,
	config.SUPABASE_SERVICE_ROLE,
]);

const connectDB = async (url: string, key: string) => {
	try {
		const newClient = createClient<Database>(url, key);

		if (!newClient)
			throw new Error('🔴 Unable to connect to the database.');

		await newClient.from('users').select('*');
		console.log('✅ Successfully Connected to the Database.');
		if (key === checked[1]) console.log('Role: Admin');
		else console.log('Role: User');
		return newClient;
	} catch (error) {
		console.error(`🔴 Unable to connect to the database: $${error}.`);
		throw new Error('🔴 Unable to connect to the database.');
	}
};

export const supabaseAdmin = async () => {
	try {
		return await connectDB(checked[0], checked[1]);
	} catch (error) {
		throw new Error(`${error}`);
	}
};

export default connectDB;
