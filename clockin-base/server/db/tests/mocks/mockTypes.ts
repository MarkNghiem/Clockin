import type { AuthError, AuthResponse } from "@supabase/supabase-js"

export type MockCredential = {
  email: string;
  password: string;
}

export type MockAuth = {
	signUp: jest.Mock<Promise<AuthResponse>, [MockCredential]>;
	signInWithPassword: jest.Mock<Promise<AuthResponse>, [MockCredential]>;
  signOut: jest.Mock<Promise<{error: AuthError | null}>>
};
