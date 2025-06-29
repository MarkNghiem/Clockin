/* eslint-disable @typescript-eslint/no-unused-vars */
import { jest } from '@jest/globals';
import { AuthError } from '@supabase/supabase-js';

import type { MockAuth, MockCredential } from './mockTypes';
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
					error: error,
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
					error: error,
				})
	),
	signOut: jest.fn(() => Promise.resolve({ error: null })),
};

const mockResponse = {
	data: [mockData],
	error: null,
	count: null,
	status: 200,
	statusText: 'OK',
};

const mockSelect = jest.fn(() =>
	Promise.resolve({
		...mockResponse,
	})
);

const mockInsert = jest.fn(() =>
	Promise.resolve({
		...mockResponse,
		data: null,
		status: 201,
		statusText: 'Created',
	})
);

const mockUpdate = jest.fn(() =>
	Promise.resolve({
		...mockResponse,
		data: null,
		status: 204,
		statusText: 'No Content',
	})
);

// const mockUpsert = jest.fn(() => Promise.resolve ({

// }))

const mockFrom = jest.fn(() => ({
	select: mockSelect,
	insert: mockInsert,
	update: mockUpdate,
	upsert: jest.fn(),
	delete: jest.fn(),
}));

export const mockCreateClient = jest.fn(() => ({
	auth: mockAuth,
	// from: mockFrom,
}));
