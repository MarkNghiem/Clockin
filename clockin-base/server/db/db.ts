import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

import { config } from '../config';

const connectDB = async () => {
	try {
		const checked = config.checkData(
			config.SUPABASE_URL,
			config.SUPABASE_SERVICE_ROLE
		);

		const supabaseAdmin = createClient<Database>(checked[0], checked[1]);
		await supabaseAdmin.from("test_table").select('1');
		console.log('✅ Successfully Connected to the Database.');
	} catch (error) {
		console.error(`🔴 Unable to connect to the database: $${error}.`);
		throw new Error('🔴 Unable to connect to the database.');
	}
};

export default connectDB;
