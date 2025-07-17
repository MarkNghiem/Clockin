/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthError } from '@supabase/supabase-js';

import type { MockAuth, MockCredential, MockSupabaseAdmin } from './mockTypes';
import type { Session, User } from '@supabase/supabase-js';

export const mockGoodCredential: MockCredential = {
	email: 'JohnDoe@email.com',
	password: 'HelloWorld',
};

export const mockBadCredential: MockCredential = {
	email: 'JaneDoe@-email.com',
	password: 'HiWorld',
};

export const mockUserData: User = {
	id: 'id',
	aud: 'authenticated',
	role: 'authenticated',
	email: mockGoodCredential.email,
	created_at: 'created_at',
	app_metadata: {},
	user_metadata: {},
};

export const mockSession: Session = {
	user: mockUserData,
	access_token: 'mocked_access_token',
	token_type: 'bearer',
	expires_in: 100,
	expires_at: 12345,
	refresh_token: 'mocked_refresh_token',
};

export const mockData = {
	some_keys: 'some_values',
	another_key: 'another_values',
};

export const error = new AuthError('Error', 400, '400');

const mockAuth: MockAuth = {
	signUp: vi.fn((mockCredential: MockCredential) =>
		mockCredential.email === mockGoodCredential.email
			? Promise.resolve({
					data: { user: mockUserData, session: null },
					error: null,
				})
			: Promise.resolve({
					data: { user: null, session: null },
					error,
				})
	),
	signInWithPassword: vi.fn((mockCredential: MockCredential) =>
		mockCredential.email === mockGoodCredential.email
			? Promise.resolve({
					data: { user: mockUserData, session: mockSession },
					error: null,
				})
			: Promise.resolve({
					data: { user: null, session: null },
					error,
				})
	),
	signOut: vi.fn(() => Promise.resolve({ error: null })),
};

export const mockCreateClient = vi.fn(() => ({
	auth: mockAuth,
}));

/**
 * verifyInitialsIDs: Mocking Supabase's .eq() method to return a promise.
 */

export const mockSupabaseAdmin: MockSupabaseAdmin = {
	schema: vi.fn((_schema: string) => mockSupabaseAdmin),
	from: vi.fn((_table: string) => mockSupabaseAdmin),
	select: vi.fn((_column: string) => mockSupabaseAdmin),
	eq: vi.fn((_key: string, _value: unknown) => mockSupabaseAdmin),
	verifyInitialIDs: vi.fn(() => {
		return Promise.resolve({
			data: [{ companies: { company_name: 'xyz' } }],
			error: null,
		});
	}),
};
