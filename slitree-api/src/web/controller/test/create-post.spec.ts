import request from 'supertest';
import { afterAll, beforeAll, expect, it, describe } from 'vitest';
import { app } from '../../../app';
import { User } from '@prisma/client';

describe('Create Post (e2e)', () => {
  let user: User;
  let token: string;

  beforeAll(async () => {
    await app.ready();

    const response = await request(app.server).post('/users/register').send({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
    });

    user = response.body;

    const responseToken = await request(app.server).post('/auth').send({
      email: 'john@gmail.com',
      password: '123456',
    });

    token = responseToken.body.token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a post', async () => {
    const response = await request(app.server)
      .post('/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Post title',
        description: 'Post description',
        type: 'divulgacao',
      });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a post without authorization token', async () => {
    const response = await request(app.server).post('/posts').send({
      title: 'Post title',
      description: 'Post description',
      type: 'divulgacao',
    });

    expect(response.status).toBe(401);
  });

  it('should not be able to create a post without type', async () => {
    const response = await request(app.server)
      .post('/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Post title',
        description: 'Post description',
      });

    expect(response.status).toBe(400);
  });
});
