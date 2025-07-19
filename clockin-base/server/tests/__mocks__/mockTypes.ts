import { AuthError } from '@supabase/supabase-js';
import type { Mock } from 'vitest';

/** Type for mock credentials to be sent to 'mockCreateClient.auth'. */
export interface MockCredential {
	email: string;
	password: string;
}

/** Type for mock Auth property in mockCreateClient object */
export interface MockAuth {
	/** 
	 * Sign up using provided credential.\
	 * Credential should be an object contains email and password.\
	 * Returns a promise.
	 */
	signUp: Mock<
		(mockCredential: MockCredential) => Promise<Record<string, unknown>>
	>;

	/** 
	 * Sign in using provided credential.
	 * Credential should be an object contains email and password.\
	 * Returns a promise contains neccessary info and change role to authenticated.\
	 * Throws an error if unable to sign in.
	 */
	signInWithPassword: Mock<
		(mockCredential: MockCredential) => Promise<Record<string, unknown>>
	>;

	/**
	 * End an user session.\
	 * Returns a promise.\
	 * Throw an error if unable to sign out.
	 */
	signOut: Mock<
		() => Promise<{ error: null | AuthError }>
	>;
}

/** Type for mock data returned from 'verifyInitialIDs' method in 'mockSupabaseAdmin' object. */
export interface VerifyInitialIDsQueryResult {
	data: Record<string, unknown>[] | Record<string,unknown> | null;
	error: { message: string; code: string; detail: string | null } | null;
}

/** A type for the Mock of supabaseAdmin object. */
export interface MockSupabaseAdmin {
	/** Schema to query from. */
	schema: Mock<(schema: string) => MockSupabaseAdmin>;

	/** Select a table to query. */
	from: Mock<(table: string) => MockSupabaseAdmin>;
	
	/** Select a column to query. */
	select: Mock<(column: string) => MockSupabaseAdmin>;
	
	/** Filter, pass in a column name and a value to filter against. */
	eq: Mock<(key: string, value: unknown) => MockSupabaseAdmin>;

	/** 
	 * Returns a single row.
	 * Returns an object instead of an array of data */
	single: Mock<() => Promise<VerifyInitialIDsQueryResult>>;
}
