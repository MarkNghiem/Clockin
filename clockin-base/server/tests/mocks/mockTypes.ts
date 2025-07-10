// !IMPORTANT: jest.Mock uses this format of typing:
// jest.Mock<ReturnType, [ArgType]>

import type { AuthError, AuthResponse } from '@supabase/supabase-js';

/**
 * Type for mock credentials to be sent to 'mockCreateClient.auth'.
 */
export interface MockCredential {
	email: string;
	password: string;
}

/**
 * Type for mock 'auth' property in 'mockCreateClient'.
 */
export interface MockAuth {
	signUp: jest.Mock<Promise<AuthResponse>, [MockCredential]>;
	signInWithPassword: jest.Mock<Promise<AuthResponse>, [MockCredential]>;
	signOut: jest.Mock<Promise<{ error: AuthError | null }>>;
}

/**
 * Type for mock data returned from 'verifyInitialIDs' method in 'mockSupabaseAdmin' object.
 */
export interface VerifyInitialIDsQueryResult {
	data: { companies: { company_name: string } | null }[] | null;
	error: { message: string; code: string; detail: string | null } | null;
}

/**
 * Type for 'mockSupabaseAdmin' object.
 * @method verifyInitialsIDs: Mocking Supabase's .eq() method to return a promise.
 */

export interface MockSupabaseAdmin {
	schema: jest.Mock<MockSupabaseAdmin, [string]>;
	from: jest.Mock<MockSupabaseAdmin, [string]>;
	select: jest.Mock<MockSupabaseAdmin, [string]>;
	eq: jest.Mock<MockSupabaseAdmin, [string, unknown]>;
	verifyInitialIDs: jest.Mock<Promise<VerifyInitialIDsQueryResult>, []>;
}
