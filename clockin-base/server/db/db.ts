import { createClient } from '@supabase/supabase-js';

import type { Database } from '../types/supabase';

const connectDB = async (url: string, key: string) => {
	try {
		const supabaseAdmin = createClient<Database>(url, key);

		if (!supabaseAdmin)
			throw new Error('🔴 Unable to connect to the database.');

		await supabaseAdmin.from('users').select('*');
		console.log('✅ Successfully Connected to the Database.');
		return supabaseAdmin;
	} catch (error) {
		console.error(`🔴 Unable to connect to the database: $${error}.`);
		throw new Error('🔴 Unable to connect to the database.');
	}
};

export default connectDB;
