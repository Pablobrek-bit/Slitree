import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryPostRepository } from '../../../repository/in-memory/inMemoryPostRepository';
import { InMemoryUserRepository } from '../../../repository/in-memory/inMemoryUserRepository';
import { DeletePostService } from '../../post/delete-post-service';
import { UnauthorizedError } from '../../errors/unauthorized-error';
import { ResourceNotFoundError } from '../../errors/resource-not-found-error';

describe('Delete post service', () => {
  let postRepository: InMemoryPostRepository;
  let userRepository: InMemoryUserRepository;
  let deletePostService: DeletePostService;

  beforeEach(() => {
    postRepository = new InMemoryPostRepository();
    userRepository = new InMemoryUserRepository();
    deletePostService = new DeletePostService(postRepository);
  });

  it('should be able to delete a post', async () => {
    const user = await userRepository.registerUser({
      email: 'pablo@gmail.com',
      name: 'Pablo',
      password: '123456',
    });

    const post = await postRepository.createPost({
      title: 'Title',
      description: 'Description',
      authorId: user.id,
      type: 'NOTICIA',
    });

    await deletePostService.execute({
      userId: user.id,
      id: post.id,
    });

    const postDeleted = await postRepository.findById('post-id');

    expect(postDeleted).toBeUndefined();
  });

  it('should not be able to delete a post with an invalid author', async () => {
    const user = await userRepository.registerUser({
      email: 'pablo@gmail.com',
      name: 'Pablo',
      password: '123456',
    });

    const post = await postRepository.createPost({
      title: 'Title',
      description: 'Description',
      authorId: user.id,
      type: 'NOTICIA',
    });

    expect(async () => {
      await deletePostService.execute({
        userId: 'invalid-id',
        id: post.id,
      });
    }).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it('should not be able to delete a post that does not exist', async () => {
    const user = await userRepository.registerUser({
      email: 'pablo@gmail.com',
      name: 'Pablo',
      password: '123456',
    });

    expect(async () => {
      await deletePostService.execute({
        userId: user.id,
        id: 'invalid-id',
      });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
