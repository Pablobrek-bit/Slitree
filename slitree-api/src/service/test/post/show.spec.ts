import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUserRepository } from '../../../repository/in-memory/inMemoryUserRepository';
import { InMemoryPostRepository } from '../../../repository/in-memory/inMemoryPostRepository';
import { ShowPostService } from '../../post/show-post-service';
import { User } from '@prisma/client';
import { ResourceNotFoundError } from '../../errors/resource-not-found-error';

describe('Show post service', () => {
  let postRepository: InMemoryPostRepository;
  let userRepository: InMemoryUserRepository;
  let showPostService: ShowPostService;
  let user: User;

  beforeEach(async () => {
    postRepository = new InMemoryPostRepository();
    userRepository = new InMemoryUserRepository();
    showPostService = new ShowPostService(postRepository);

    user = await userRepository.registerUser({
      email: 'pablo@gmail.com',
      name: 'Pablo',
      password: '123456',
    });
  });

  it('should be able to show a post', async () => {
    const post = await postRepository.createPost({
      title: 'Title',
      description: 'Description',
      authorId: user.id,
      type: 'NOTICIA',
    });

    const { post: returnedPost } = await showPostService.execute({
      id: post.id,
    });

    expect(returnedPost).toEqual(post);
  });

  it('should throw an error if post does not exist', async () => {
    await expect(async () => {
      await showPostService.execute({
        id: 'invalid-id',
      });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
