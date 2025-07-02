import request from 'supertest';

import app, { gracefullyShutDown, supabaseAdmin } from '../../server';

describe('Server Connection and Database Connection Integration Test', () => {
	afterAll(async () => {
		await gracefullyShutDown();
	});

	describe('GET /p1', () => {
		it('Should respond with a 200 status code and an HTML page', async () => {
			const res = await request(app).get('/p1');

			expect(res.status).toBe(200);
			expect(res.type).toMatch(/html/);
			expect(res.text).toContain('<!doctype html>');
		});

		it('Should connect to a database', () => {
			expect(supabaseAdmin).toBeDefined();
		});

		it('Should return with a 404 status code and a message when visiting an invalid endpoint', async () => {
			const res = await request(app).get('/p1/invalid');

			expect(res.status).toBe(404);
			expect(res.type).toMatch(/json/);
			expect(res.body).toBe('This is not the page you are looking for');
		});
	});
});
