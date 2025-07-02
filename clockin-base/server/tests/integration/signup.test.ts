import request from 'supertest';

import app, { gracefullyShutDown, supabaseAdmin } from '../../server';

describe('Testing Sign Up Integration Routes', () => {
	afterAll(async () => {
		await gracefullyShutDown();
	});

	describe('POST /signup', () => {
    const initialCreadential = {
      employeeID: '',
      companyID: ''
    }
		it('Should respond with a 200 status code and a JSON object', async () => {
      const res = await request(app).post("/p1/user/signup").send(initialCreadential);

      expect(res.status).toEqual(200);
      expect(res.type).toMatch(/json/);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
    });
	});
});
