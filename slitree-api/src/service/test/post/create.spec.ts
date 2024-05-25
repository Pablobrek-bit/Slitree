import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryPostRepository } from '../../../repository/in-memory/inMemoryPostRepository';
import { CreatePostService } from '../../post/create-post-service';
import { InMemoryUserRepository } from '../../../repository/in-memory/inMemoryUserRepository';
import { ResourceNotFoundError } from '../../errors/resource-not-found-error';

describe('Create post service', () => {
  let postRepository: InMemoryPostRepository;
  let userRepository: InMemoryUserRepository;
  let createPostService: CreatePostService;

  beforeEach(() => {
    postRepository = new InMemoryPostRepository();
    userRepository = new InMemoryUserRepository();
    createPostService = new CreatePostService(postRepository, userRepository);
  });

  it('should be able to create a post', async () => {
    const user = await userRepository.registerUser({
      email: 'pablo@gmail.com',
      name: 'Pablo',
      password: '123456',
    });

    const { post } = await createPostService.execute({
      title: 'Title',
      description: 'Description',
      authorId: user.id,
      type: 'NOTICIA',
    });

    expect(post.id).toEqual(expect.any(String));
  });

  it('should not be able to create a post with an invalid author', async () => {
    await expect(
      createPostService.execute({
        title: 'Title',
        description: 'Description',
        authorId: 'invalid-id',
        type: 'NOTICIA',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('should set createdAt and updateAt when creating a post', async () => {
    const user = await userRepository.registerUser({
      email: 'pablo@gmail.com',
      name: 'Pablo',
      password: '123456',
    });

    const { post } = await createPostService.execute({
      title: 'Title',
      description: 'Description',
      authorId: user.id,
      type: 'NOTICIA',
    });

    expect(post).toHaveProperty('createdAt');
    expect(post.createdAt).toBeInstanceOf(Date);

    expect(post).toHaveProperty('updatedAt');
    expect(post.updatedAt).toBeInstanceOf(Date);
  });
});
