/* eslint-disable @typescript-eslint/no-unused-vars */
import { jest } from '@jest/globals';
import { config } from '../../../config';
import { AuthError } from '@supabase/supabase-js';
import type { AuthResponse } from '@supabase/supabase-js';

import {
	mockGoodCredential,
	mockCreateClient,
	mockBadCredential,
} from '../mocks/mocks';
import type { MockCredential } from '../mocks/mockTypes';

jest.unstable_mockModule('@supabase/supabase-js', () => ({
	createClient: mockCreateClient,
}));

const mockedModule = await import('@supabase/supabase-js');

describe('Database Functionalities Tests', () => {
	let checked: string[];
	let supabase: ReturnType<typeof mockedModule.createClient>;

	beforeAll(() => {
		checked = config.checkData(
			config.SUPABASE_URL,
			config.SUPABASE_ANON_KEY
		);
	});

	beforeEach(async () => {
		try {
			supabase = mockedModule.createClient(checked[0], checked[1]);
			console.log('✅ New Test Client created!');
		} catch (error) {
			console.error(error);
			throw new Error('🔴 Unable to create new test client.');
		}
	});

	it('Should create a new client', () => {
		expect(mockedModule.createClient).toHaveBeenCalled();
		expect(mockedModule.createClient).toHaveReturned();
		expect(supabase).toBeDefined();
	});

	describe('Security Checks', () => {
		describe('New User Sign Up Checks', () => {
			let newUser: AuthResponse;

			beforeEach(async () => {
				try {
					newUser = await supabase.auth.signUp(mockGoodCredential);
				} catch (error) {
					console.error(error);
					throw new Error(newUser.error?.message);
				}
			});

			it('Credentials should have values and they must be strings', () => {
				expect(mockGoodCredential).toHaveProperty('email');
				expect(mockGoodCredential).toHaveProperty('password');
				expect(mockGoodCredential.email).toBeTruthy();
				expect(mockGoodCredential.password).toBeTruthy();
				expect(typeof mockGoodCredential.email).toBe('string');
				expect(typeof mockGoodCredential.password).toBe('string');
			});

			it('Should response with data', () => {
				expect(supabase.auth.signUp).toHaveBeenCalled();
				expect(supabase.auth.signUp).toHaveReturned();
				expect(newUser).toBeDefined();
				expect(newUser).toHaveProperty('data');
			});

			it('The email should match', () => {
				expect(newUser.data).toHaveProperty('user');
				expect(newUser.data.user?.email).toBe(mockGoodCredential.email);
			});

			it('Should not contain a session', () => {
				expect(newUser.data).toHaveProperty('session');
				expect(newUser.data.session).toBeNull();
			});

			it('Should not have an error when successfully signed up', () => {
				expect(newUser.error).toBeNull();
			});
		});

		describe('User Sign In Checks', () => {
			let user: AuthResponse;
			beforeEach(async () => {
				try {
					user =
						await supabase.auth.signInWithPassword(mockGoodCredential);
					console.log(`✅ ${mockGoodCredential.email} signed in.`);
				} catch (error) {
					console.error(error);
					throw new Error(user.error?.message);
				}
			});

			afterEach(async () => {
				try {
					const signedOut = await supabase.auth.signOut();
					if (signedOut.error) {
						console.error(signedOut.error.message);
						throw new Error(signedOut.error.message);
					}
				} catch (error) {
					console.error(error);
					throw new Error('🔴 Unable to sign out.')
				}
			})

			it('Credentials should have values and they must be strings', () => {
				expect(mockGoodCredential).toHaveProperty('email');
				expect(mockGoodCredential).toHaveProperty('password');
				expect(mockGoodCredential.email).toBeTruthy();
				expect(mockGoodCredential.password).toBeTruthy();
				expect(typeof mockGoodCredential.email).toBe('string');
				expect(typeof mockGoodCredential.password).toBe('string');
			});

			it('Should run the functions', () => {
				expect(supabase.auth.signInWithPassword).toHaveBeenCalled();
				expect(supabase.auth.signInWithPassword).toHaveReturned();
			});

			it('Should return with data', () => {
				expect(user).toBeDefined();
				expect(user).toHaveProperty('data');
				expect(user.data).toBeDefined();
			});

			it('Email should be matched and role should be authenticated', () => {
				expect(user.data.user).toHaveProperty('email');
				expect(user.data.user?.email).toBe(mockGoodCredential.email);
				expect(user.data.user).toHaveProperty('role');
				expect(user.data.user?.role).toBe('authenticated');
			});

			it('Should have a session', () => {
				expect(user.data).toHaveProperty('session');
				expect(user.data.session).toBeDefined();
			});

			it('Session should contain tokens and expiration times', () => {
				expect(user.data.session).toHaveProperty('access_token');
				expect(user.data.session).toHaveProperty('refresh_token');
				expect(user.data.session).toHaveProperty('token_type');
				expect(user.data.session).toHaveProperty('expires_in');
				expect(user.data.session).toHaveProperty('expires_at');
				expect(user.data.session?.access_token).toBeTruthy();
				expect(user.data.session?.refresh_token).toBeTruthy();
				expect(user.data.session?.token_type).toBeTruthy();
				expect(user.data.session?.expires_in).toBeTruthy();
				expect(user.data.session?.expires_at).toBeTruthy();
			});

			it('Sould not throw an error when successfully signed in', () => {
				expect(user.error).toBeNull();
			});
		});

		describe('User Sign Out Checks', () => {
			let user: AuthResponse;
			let signedOut: Awaited<ReturnType<typeof supabase.auth.signOut>>;

			beforeEach(async () => {
				try {
					user =
						await supabase.auth.signInWithPassword(mockGoodCredential);

					if (user.error) {
						console.error(user.error.message);
						throw new Error(user.error.message);
					}
					console.log(`✅ ${mockGoodCredential.email} signed in.`);

					signedOut = await supabase.auth.signOut();
					if (signedOut.error) {
						console.error(signedOut.error.message);
						throw new Error(signedOut.error.message);
					}
					console.log('✅ Successfully signed out.');
				} catch (error) {
					console.error(error);
					throw new Error('🔴 Could not sign in or sign out');
				}
			});

			it('Should have no error', async () => {
				expect(supabase.auth.signOut).toHaveBeenCalled();
				expect(supabase.auth.signOut).toHaveReturned();
				expect(signedOut.error).toBeNull();
			});
		});

		describe('Fail Cases', () => {
			const error = new AuthError('Error', 400, '400');

			beforeEach(() => {
				mockCreateClient.mockReturnValueOnce({
					auth: {
						signUp: jest.fn((_mockCredential: MockCredential) =>
							Promise.resolve({
								data: { user: null, session: null },
								error: error,
							})
						),
						signInWithPassword: jest.fn(
							(_mockCredential: MockCredential) =>
								Promise.resolve({
									data: { user: null, session: null },
									error: error,
								})
						),
						signOut: jest.fn(() =>
							Promise.resolve({ error: error })
						),
					},
				});
			});

			it('Should throw when signing up fails', async () => {
				await expect(
					supabase.auth.signUp(mockBadCredential)
				).resolves.toHaveProperty('error', error);
			});

			it('Should throw when signing in fails', async () => {
				await expect(
					supabase.auth.signInWithPassword(mockBadCredential)
				).resolves.toHaveProperty('error', error);
			});

			it('Should throw when signing out fails', async () => {
				await expect(supabase.auth.signOut()).resolves.toHaveProperty(
					'error',
					error
				);
			});
		});
	});
});

jest.unstable_unmockModule('@supabase/supabase-js');
