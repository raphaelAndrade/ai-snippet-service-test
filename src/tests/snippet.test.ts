import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose'; // <- Adicionado

describe('POST /snippets', () => {
  it('should create a snippet and return summary', async () => {
    // Log in to obtain a valid JWT token
    const loginResponse = await request(app)
      .post('/auth/login')
      .send({ email: 'user@example.com', code: '654321' });

    const token = loginResponse.body.token;
    expect(token).toBeDefined(); // Ensure the token was received

    // Send an authenticated request to create a snippet
    const res = await request(app)
      .post('/snippets')
      .set('Authorization', `Bearer ${token}`) // Attach the token in the Authorization header
      .send({ text: 'This is a long text to be summarized' });

    // Validate the response
    expect(res.status).toBe(201); // Expect HTTP 201 Created
    expect(res.body).toHaveProperty('id'); // The response should include the snippet ID
    expect(res.body).toHaveProperty('text'); // The original text should be returned
    expect(res.body).toHaveProperty('summary'); // The AI-generated summary should be returned
  }, 20000);
});

// <- Adicionado
afterAll(async () => {
  await mongoose.connection.close();
});
