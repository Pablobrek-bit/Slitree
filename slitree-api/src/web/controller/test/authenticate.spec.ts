import { afterAll, beforeAll, expect, it, describe } from 'vitest';
import { app } from '../../../app';
import request from 'supertest';

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to authenticated', async () => {
    await request(app.server).post('/users/register').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await request(app.server).post('/auth').send({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
  });

  it('should not be able to authenticate with invalid email', async () => {});
});
