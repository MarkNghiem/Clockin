import { createClient } from '@supabase/supabase-js';

import { config } from '../config';

const connectDB = () => {
	try {
		const checked = config.checkData(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE);

		createClient(checked[0], checked[1]);
		console.log('✅ Successfully Connected to the Database.');
	} catch (error) {
		console.error(`🔴 Unable to connect to the database: $${error}.`);
		throw new Error('🔴 Unable to connect to the database.');
	}
};

export default connectDB;
