/* eslint-disable @typescript-eslint/no-unused-vars */
import { jest } from '@jest/globals';
import { AuthError } from '@supabase/supabase-js';

import type { MockSupabaseAdmin, MockAuth, MockCredential } from './mockTypes';

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
	signUp: jest.fn((mockCredential: MockCredential) =>
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
	signInWithPassword: jest.fn((mockCredential: MockCredential) =>
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
	signOut: jest.fn(() => Promise.resolve({ error: null })),
};

export const mockCreateClient = jest.fn(() => ({
	auth: mockAuth,
}));

/**
 * verifyInitialsIDs: Mocking Supabase's .eq() method to return a promise.
 */

export const mockSupabaseAdmin: MockSupabaseAdmin = {
	schema: jest.fn((_schema: string) => mockSupabaseAdmin),
	from: jest.fn((_table: string) => mockSupabaseAdmin),
	select: jest.fn((_column: string) => mockSupabaseAdmin),
	eq: jest.fn((_key: string, _value: unknown) => mockSupabaseAdmin),
	verifyInitialIDs: jest.fn(() => {
		return Promise.resolve({
			data: [{ companies: { company_name: 'xyz' } }],
			error: null,
		});
	}),
};
