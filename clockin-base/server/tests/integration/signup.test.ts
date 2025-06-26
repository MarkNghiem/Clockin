import request from 'supertest';
import app, { gracefullyShutDown } from '../../server';

describe('Testing Sign Up Integration Routes', () => {
	afterAll(async () => {
		await gracefullyShutDown();
	});

	describe('POST /signup', () => {
    const mockData = {
      employeeID: "ABC123",
      companyID: "456XYZ"
    }
		it('Should ', async () => {
      const res = await request(app).post("/p1/signup").send(mockData);

      expect(res.status).toEqual(201);
      expect(res.type).toMatch(/json/);
      expect(res.body)
    });
	});
});
