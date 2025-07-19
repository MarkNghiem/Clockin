/**
 * Controller for Supabase Behaviours
 * - verifyInitialIDs: Send checked IDs to the database to search and verify one more time
 */

import { supabaseAdmin } from '../db/db';
import { PostgrestError } from '@supabase/supabase-js';

import type { SupabaseController } from '../types/types';

const supabaseController: SupabaseController = {
	verifyInitialIDs: async (_req, res, next) => {
		console.log('🔵 Runnning Supabase verifyInitialIDs middleware...');
		try {
			const databaseAdmin = await supabaseAdmin();
			const { employeeID, companyID } = res.locals.credentials;
			let data: { companies: { company_name: string } | null } | null,
				error: PostgrestError | null;
			if (process.env.NODE_ENV === 'test') {
				({ data, error } = await databaseAdmin
					.schema('test')
					.from('employees_in_company')
					.select('companies!inner(company_name)')
					.eq('employee_id', employeeID)
					.eq('company_id', companyID)
					.single());
			} else {
				({ data, error } = await databaseAdmin
					.from('employees_in_company')
					.select('companies!inner(company_name)')
					.eq('employee_id', employeeID)
					.eq('company_id', companyID)
					.single());
			}
			if (error) {
				return next({
					log: `🔴 Error: ${error.details} | supabaseController > verifyInitialIDs.`,
					status: 404,
					message: { error: error.message },
				});
			}

			res.locals.data = data;
			return next();
		} catch (error) {
			return next({
				log: `🔴 ${error} | supabaseController > verifyInitialIDs.`,
				status: 500,
				message: {
					error: '🔴 Internal Server Error. Unable to retrieve from database.',
				},
			});
		}
	},
};

export default supabaseController;
