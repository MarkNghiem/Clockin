import request from 'supertest';

import app, { gracefullyShutDown } from '../../server';
import { config } from '../../config';
import connectDB from '../../db/db';

describe('Testing Sign Up Integration Routes', () => {
  let checked: string[];
  beforeAll(async () => {
    connectDB();
    checked = config.checkData(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);
  })

	afterAll(async () => {
		await gracefullyShutDown();
	});

	describe('POST /signup', () => {
		it('Should respond with a 200 status code and a JSON object', async () => {
      const res = await request(app).post("/p1/signup").send(initialID);

      expect(res.status).toEqual(200);
      expect(res.type).toMatch(/json/);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
    });
	});
});
