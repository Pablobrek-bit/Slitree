import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryPostRepository } from '../../../repository/in-memory/inMemoryPostRepository';
import { InMemoryUserRepository } from '../../../repository/in-memory/inMemoryUserRepository';
import { IndexPostService } from '../../post/index-post-service';
import { User } from '@prisma/client';

describe('Index post service', () => {
  let postRepository: InMemoryPostRepository;
  let userRepository: InMemoryUserRepository;
  let indexPostService: IndexPostService;
  let user: User;

  beforeEach(async () => {
    postRepository = new InMemoryPostRepository();
    userRepository = new InMemoryUserRepository();
    indexPostService = new IndexPostService(postRepository);

    user = await userRepository.registerUser({
      email: 'pablo@gmail.com',
      name: 'Pablo',
      password: '123456',
    });

    for (let i = 0; i < 10; i++) {
      await postRepository.createPost({
        title: 'Title' + i,
        description: 'Description' + i,
        authorId: user.id,
        type: 'NOTICIA',
      });
    }
  });

  it('should be able to get all posts', async () => {
    const { posts } = await indexPostService.execute({ userId: user.id });

    expect(posts.length).toBe(10);
    expect(Array.isArray(posts)).toBeTruthy();
  });

  it('should return correct post properties', async () => {
    const { posts } = await indexPostService.execute({ userId: user.id });

    expect(posts[0].title).toBe('Title0');
  });
});
