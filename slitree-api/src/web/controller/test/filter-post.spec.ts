import request from 'supertest';
import { afterAll, beforeAll, expect, it, describe } from 'vitest';
import { app } from '../../../app';
import { User } from '@prisma/client';

describe('Filter Post (e2e)', () => {
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

    for (let i = 0; i < 5; i++) {
      await request(app.server)
        .post('/posts')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Post title',
          description: 'Post description',
          type: 'divulgacao',
        });
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to filter posts by type', async () => {
    const response = await request(app.server)
      .get('/posts/filter?type=divulgacao')
      .set('Authorization', `Bearer ${token}`);

    expect(response.body.posts).toHaveLength(5);
  });
});
