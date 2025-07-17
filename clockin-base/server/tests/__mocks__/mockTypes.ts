import { AuthError } from '@supabase/supabase-js';
import type { Mock } from 'vitest';

/**
 * Type for mock credentials to be sent to 'mockCreateClient.auth'.
 */
export interface MockCredential {
	email: string;
	password: string;
}

export interface MockAuth {
	signUp: Mock<
		(mockCredential: MockCredential) => Promise<Record<string, unknown>>
	>;
	signInWithPassword: Mock<
		(mockCredential: MockCredential) => Promise<Record<string, unknown>>
	>;
	signOut: Mock<
		() => Promise<{ error: null | AuthError }>
	>;
}

/**
 * Type for mock data returned from 'verifyInitialIDs' method in 'mockSupabaseAdmin' object.
 */
export interface VerifyInitialIDsQueryResult {
	data: Record<string, unknown>[] | null;
	error: { message: string; code: string; detail: string | null } | null;
}

export interface MockSupabaseAdmin {
	schema: Mock<(schema: string) => MockSupabaseAdmin>;
	from: Mock<(table: string) => MockSupabaseAdmin>;
	select: Mock<(column: string) => MockSupabaseAdmin>;
	eq: Mock<(key: string, value: unknown) => MockSupabaseAdmin>;
	verifyInitialIDs: Mock<() => Promise<VerifyInitialIDsQueryResult>>;
}
