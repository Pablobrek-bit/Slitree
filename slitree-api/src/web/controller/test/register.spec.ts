import request from 'supertest';
import { afterAll, beforeAll, expect, it, describe } from 'vitest';
import { app } from '../../../app';

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to register', async () => {
    const response = await request(app.server).post('/users/register').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response.status).toBe(201);
  });

  it('should not be able to register with the same email', async () => {
    const response = await request(app.server).post('/users/register').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User already exists');
  });

  it('should not be able to register without name', async () => {
    const response = await request(app.server).post('/users/register').send({
      email: 'johndoe2@example.com',
      password: '123456',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Validation error');
  });

  it('should not be able to register without email', async () => {
    const response = await request(app.server).post('/users/register').send({
      name: 'John Doe',
      email: 'johndoe2@example.com',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Validation error');
  });

  it('should not be able to register without email', async () => {
    const response = await request(app.server).post('/users/register').send({
      name: 'John Doe',
      password: '123456',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Validation error');
  });
});
