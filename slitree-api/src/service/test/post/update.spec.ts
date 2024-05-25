import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryPostRepository } from '../../../repository/in-memory/inMemoryPostRepository';
import { InMemoryUserRepository } from '../../../repository/in-memory/inMemoryUserRepository';
import { UpdatePostService } from '../../post/update-post-service';
import { User } from '@prisma/client';
import { ResourceNotFoundError } from '../../errors/resource-not-found-error';
import { UnauthorizedError } from '../../errors/unauthorized-error';

describe('Update post service', () => {
  let postRepository: InMemoryPostRepository;
  let userRepository: InMemoryUserRepository;
  let updatePostService: UpdatePostService;
  let user: User;

  beforeEach(async () => {
    postRepository = new InMemoryPostRepository();
    userRepository = new InMemoryUserRepository();
    updatePostService = new UpdatePostService(postRepository);

    user = await userRepository.registerUser({
      email: 'pablo@gmail.com',
      name: 'Pablo',
      password: '123456',
    });
  });

  it('should be able to update a post', async () => {
    const post = await postRepository.createPost({
      title: 'Title',
      description: 'Description',
      authorId: user.id,
      type: 'NOTICIA',
    });

    const { post: updatedPost } = await updatePostService.execute({
      id: post.id,
      userId: user.id,
      title: 'Updated title',
    });

    expect(updatedPost.title).toBe('Updated title');
    expect(updatedPost.description).toBe('Description');
  });

  it('should throw an error if post does not exist', async () => {
    await expect(async () => {
      await updatePostService.execute({
        id: 'invalid-id',
        userId: user.id,
      });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('should throw an error if user is not the author of the post', async () => {
    const post = await postRepository.createPost({
      title: 'Title',
      description: 'Description',
      authorId: user.id,
      type: 'NOTICIA',
    });

    await expect(async () => {
      await updatePostService.execute({
        id: post.id,
        userId: 'invalid-user-id',
      });
    }).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it('should be able to update a post with all fields', async () => {
    const post = await postRepository.createPost({
      title: 'Title',
      description: 'Description',
      authorId: user.id,
      type: 'NOTICIA',
    });

    const { post: updatedPost } = await updatePostService.execute({
      id: post.id,
      userId: user.id,
      title: 'Updated title',
      description: 'Updated description',
      type: 'EDITAL',
    });

    expect(updatedPost.title).toBe('Updated title');
    expect(updatedPost.description).toBe('Updated description');
    expect(updatedPost.type).toBe('EDITAL');
  });
});
