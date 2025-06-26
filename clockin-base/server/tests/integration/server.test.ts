import request from 'supertest';
import app, { gracefullyShutDown } from '../../server';

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
	});
});
