/**
 * Controller for Supabase Behaviours
 * - verifyInitialIDs: Send checked IDs to the database to search and verify one more time
 */

import type { Request, Response, NextFunction } from "express"
import { supabaseAdmin } from "../server";

interface SupabaseController {
  verifyInitialIDs: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};

const supabaseController: SupabaseController = {
  verifyInitialIDs: async (req, res, next) => {
    console.log('🔵 Runnning Supabase verifyInitialIDs middleware...');
    try {
      const {employeeID, companyID} = await res.locals.credentials;
      const foundCredential = supabaseAdmin.from('companies').select('')
    } catch (error) {
      
    }
  }
}

export default supabaseController;