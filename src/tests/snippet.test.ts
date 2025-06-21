import request from 'supertest';
import app from '../app';

describe('POST /snippets', () => {
  it('should create a snippet and return summary', async () => {
    const res = await request(app)
      .post('/snippets')
      .send({ text: 'This is a long text to be summarized' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('text');
    expect(res.body).toHaveProperty('summary');
  });
});
