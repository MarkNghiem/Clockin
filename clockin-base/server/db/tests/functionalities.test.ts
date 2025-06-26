import { createClient } from '@supabase/supabase-js';
import { config } from '../../config';

describe('Database Functionalities Tests', () => {
	beforeEach(async () => {
		try {
			const checked = config.checkData(
				config.SUPABASE_URL,
				config.SUPABASE_ANON_KEY
			);

			const newClient = createClient(checked[0], checked[1]);
      console.log('✅ New Test Client created!');

      const {data, error} = await newClient.auth.getSession();
      
      if (error) {
        console.error(error);
        throw new Error('🔴 Unable to retrieve user session.');
      };

      const token = data.session?.access_token;
      return token;
		} catch (error) {
      console.error(error);
      throw new Error('🔴 Unable to create new test client.');
    }
	});

});
