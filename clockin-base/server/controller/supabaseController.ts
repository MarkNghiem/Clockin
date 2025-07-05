/**
 * Controller for Supabase Behaviours
 * - verifyInitialIDs: Send checked IDs to the database to search and verify one more time
 */

import { supabaseAdmin } from '../server';
import { PostgrestError } from '@supabase/supabase-js';

import type { SupabaseController } from '../types/types';

const supabaseController: SupabaseController = {
	verifyInitialIDs: async (_req, res, next) => {
		console.log('🔵 Runnning Supabase verifyInitialIDs middleware...');
		try {
			const { employeeID, companyID } = await res.locals.credentials;
			let data: { companies: { company_name: string } | null }[] | null,
				error: PostgrestError | null;
			if (process.env.NODE_ENV === 'test') {
				({ data, error } = await supabaseAdmin
					.schema('test')
					.from('employees_in_company')
					.select('companies!inner(company_name)')
					.eq('employee_id', employeeID)
					.eq('company_id', companyID));
			} else {
				({ data, error } = await supabaseAdmin
					.from('employees_in_company')
					.select('companies!inner(company_name)')
					.eq('employee_id', employeeID)
					.eq('company_id', companyID));
			}
			if (error) {
				return next({
					log: `Error: ${error.details}`,
					status: error.code,
					message: { error: error.message },
				});
			}

			if (!data || data[0].companies === null) {
				return next({
					log: '🔴 No Data Found.',
					status: 404,
					message: { error: '🔴 No Data Found.' },
				});
			}

			if (data.length > 1) {
				return next({
					log: '🔴 Unexpected Behaviour from Database. Please contact administrator.',
					status: 500,
					message: {
						error: '🔴 Unexpected Behaviour from Database. Please contact administrator.',
					},
				});
			}

			res.locals.data = data;
			return next();
		} catch (error) {
			return next({
				log: `🔴 Internal Server Error: ${error}`,
				status: 500,
				message: {error: '🔴 Unable to retrieve from database.'},
			});
		}
	},
};

export default supabaseController;
