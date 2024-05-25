import { User } from '@prisma/client';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUserRepository } from '../../../repository/in-memory/inMemoryUserRepository';
import { InMemoryPostRepository } from '../../../repository/in-memory/inMemoryPostRepository';
import { FilterPostService } from '../../post/filter-post-service';
import { UnauthorizedError } from '../../errors/unauthorized-error';
import { ArgumentNotValidError } from '../../errors/argument-not-valid-error';

describe('Filter post service', () => {
  let postRepository: InMemoryPostRepository;
  let userRepository: InMemoryUserRepository;
  let filterPostService: FilterPostService;
  let user: User;

  beforeEach(async () => {
    postRepository = new InMemoryPostRepository();
    userRepository = new InMemoryUserRepository();
    filterPostService = new FilterPostService(postRepository, userRepository);

    user = await userRepository.registerUser({
      email: 'pablo@gmail.com',
      name: 'Pablo',
      password: '123456',
    });

    for (let i = 0; i < 10; i++) {
      await postRepository.createPost({
        title: `Title ${i}`,
        description: `Description ${i}`,
        authorId: user.id,
        type: 'NOTICIA',
      });
    }

    for (let i = 0; i < 5; i++) {
      await postRepository.createPost({
        title: `Title ${i}`,
        description: `Description ${i}`,
        authorId: user.id,
        type: 'EDITAL',
      });
    }

    await postRepository.createPost({
      title: 'Title',
      description: 'Description',
      authorId: user.id,
      type: 'DIVULGACAO',
    });
  });

  it('should be able to filter posts', async () => {
    const { posts } = await filterPostService.execute({
      userId: user.id,
    });

    expect(posts).toHaveLength(16);
  });

  it('should be able to filter posts by type NOTICIA', async () => {
    const { posts } = await filterPostService.execute({
      userId: user.id,
      type: 'NOTICIA',
    });

    expect(posts).toHaveLength(10);
  });

  it('should be able to filter posts by type EDITAL', async () => {
    const { posts } = await filterPostService.execute({
      userId: user.id,
      type: 'EDITAL',
    });

    expect(posts).toHaveLength(5);
  });

  it('should be able to filter posts by type DIVULGACAO', async () => {
    const { posts } = await filterPostService.execute({
      userId: user.id,
      type: 'DIVULGACAO',
    });

    expect(posts).toHaveLength(1);
  });

  it('should be able to filter posts by pagination', async () => {
    const { posts } = await filterPostService.execute({
      userId: user.id,
      page: 1,
      tam: 5,
    });

    expect(posts).toHaveLength(5);
  });

  it('should be able to filter posts by pagination and type', async () => {
    const { posts } = await filterPostService.execute({
      userId: user.id,
      page: 1,
      tam: 5,
      type: 'DIVULGACAO',
    });

    expect(posts).toHaveLength(1);
  });

  it('should throw an error if user does not exist', async () => {
    await expect(async () => {
      await filterPostService.execute({
        userId: 'invalid-user-id',
      });
    }).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it('should throw an error if page is invalid', async () => {
    await expect(async () => {
      await filterPostService.execute({
        userId: user.id,
        page: -1,
      });
    }).rejects.toBeInstanceOf(ArgumentNotValidError);
  });

  it('should throw an error if tam is invalid', async () => {
    await expect(async () => {
      await filterPostService.execute({
        userId: user.id,
        tam: -1,
      });
    }).rejects.toBeInstanceOf(ArgumentNotValidError);
  });
});
