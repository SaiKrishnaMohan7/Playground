const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);

const { request, expect } = chai;

describe('Rate-limiting service', () => {
  it('should accept requests within the limit', async () => {
    const res = await request(app).post('/take/').send({ endpoint: 'GET /user/:id' });
    expect(res.body).to.have.property('accept', true);
  });

  it('should reject requests when the limit is exceeded', async () => {
    // Simulate exhausting the tokens
    for (let i = 0; i < 101; i++) {
      await request(app).post('/take/').send({ endpoint: 'GET /user/:id' });
    }
    const res = await request(app).post('/take/').send({ endpoint: 'GET /user/:id' });
    expect(res.body).to.have.property('accept', false);
  });

  it('should return an error for missing or invalid JSON body', async () => {
    const res = await request(app).post('/take/').send();
    expect(res).to.have.status(400);
    expect(res.body.message).to.equal('Invalid endpoint');
  });

  it('should handle rate limits independently for multiple endpoints', async () => {
    const userGetEndpoint = 'GET /user/:id';
    const userPatchEndpoint = 'PATCH /user/:id';

    // Exhaust tokens for the first endpoint
    for (let i = 0; i < 10; i++) {
      await request(app).post('/take/').send({ endpoint: userGetEndpoint });
    }

    const res1 = await request(app).post('/take/').send({ endpoint: userGetEndpoint });
    expect(res1.body.accept).to.equal(false);

    // Ensure the second endpoint is unaffected
    const res2 = await request(app).post('/take/').send({ endpoint: userPatchEndpoint });
    expect(res2.body.accept).to.equal(true);
    expect(res2.body.remainingTokens).to.equal(9);
  });
});