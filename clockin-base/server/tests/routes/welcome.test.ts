import request from 'supertest';

const server = "https://localhost:3000/p1";

describe("Route Integrations", () => {
  describe("/welcome", () => {
    describe("GET", () => {
      it("Should respond with a 200 status code and a message", async() => {
        const res = await request(server).get('/');
        expect(res.status).toBe(200);
        expect(res.)
      })
    })
  })
})