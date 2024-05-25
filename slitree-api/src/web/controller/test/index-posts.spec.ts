import request from 'supertest';
import { afterAll, beforeAll, expect, it, describe } from 'vitest';
import { app } from '../../../app';
import { User } from '@prisma/client';

describe('Index Post (e2)', () => {
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

  it('should be able to list all posts', async () => {
    const response = await request(app.server)
      .get('/posts/index')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should not be able to list all posts without authorization token', async () => {
    const response = await request(app.server).get('/posts/index');

    expect(response.status).toBe(401);
  });

  it('should be able return an empty array if there are no posts', async () => {
    const response = await request(app.server)
      .get('/posts/index')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.posts).toEqual([]);
  });
});
