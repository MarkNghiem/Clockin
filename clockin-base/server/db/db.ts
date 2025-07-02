import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

import { config } from '../config';

const connectDB = () => {
	try {
		const checked = config.checkData(
			config.SUPABASE_URL,
			config.SUPABASE_SERVICE_ROLE
		);

		if (process.env.NODE_ENV === 'Production') {
			const supabaseAdmin = createClient<Database>(
				checked[0],
				checked[1]
			);
			console.log('✅ Successfully Connected to the Database.');
			return supabaseAdmin;
		} else if (process.env.NODE_ENV === 'test') {
			const supabaseAdmin = createClient(checked[0], checked[1], {
				db: { schema: 'test' },
			});
			console.log('✅ Successfully Connected to the Test Database.');
			return supabaseAdmin;
		}
	} catch (error) {
		console.error(`🔴 Unable to connect to the database: $${error}.`);
		throw new Error('🔴 Unable to connect to the database.');
	}
};

export default connectDB;
