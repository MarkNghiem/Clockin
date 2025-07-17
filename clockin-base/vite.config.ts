// Configs for both Vite and Vitest
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	test: {
		globals: true,
		projects: [
			{
				test: {
					globals: true,
					include: ['server/tests/db/*.test.{ts,js}'],
					name: { label: 'Database Unit Tests', color: 'magenta' },
				},
			},
			{
				test: {
					globals: true,
					include: ['server/tests/middleware/*.test.{ts,js}'],
					name: { label: 'Middleware Unit Tests', color: 'magenta' },
				},
			},
			{
				test: {
					globals: true,
					include: ['server/tests/integration/*.test.{ts,js}'],
					name: {
						label: 'Server Integration Tests',
						color: 'magenta',
					},
				},
			},
		],
	},
});
