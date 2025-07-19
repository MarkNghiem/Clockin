import request from 'supertest';

import connectDB from '../../db/db';
import { app } from '../../server';

describe('Server Connection and Database Connection Integration Test', () => {
	describe('GET /p1', () => {
		describe('Success', () => {
			it('Should respond with a 200 status code and an HTML page', async () => {
				const res = await request(app).get('/p1');

				expect(res.status).toBe(200);
				expect(res.type).toMatch(/html/);
				expect(res.text).toContain('<!doctype html>');
			});
		});

		describe('Failures', () => {
			it('Should return with a 404 status code and a message when visiting an invalid endpoint', async () => {
				const res = await request(app).get('/p1/invalid');

				expect(res.status).toBe(404);
				expect(res.type).toMatch(/json/);
				expect(res.body).toBe(
					'This is not the page you are looking for'
				);
			});

			it('Should throw correct errors when unable to connect to the database', async () => {
				await expect(connectDB('mockUrl', 'mockKey')).rejects.toThrow(
					'🔴 Unable to connect to the database.'
				);
			});
		});
	});
});
