import { PostType } from '@prisma/client';
import { PostRepository } from '../../repository/interface/postRepository';
import { PostWithLike } from '../../@types/post-without-author-id';
import { UserRepository } from '../../repository/interface/userRepository';
import { UnauthorizedError } from '../errors/unauthorized-error';
import { ArgumentNotValidError } from '../errors/argument-not-valid-error';

interface FilterPostServiceRequest {
  page?: number;
  tam?: number;
  type?: PostType;
  userId: string;
  search?: string;
}

interface FilterPostServiceResponse {
  posts: PostWithLike[];
}

export class FilterPostService {
  constructor(
    private postRepository: PostRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    page,
    tam,
    type,
    userId,
    search,
  }: FilterPostServiceRequest): Promise<FilterPostServiceResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    if (page != null && page < 1) {
      throw new ArgumentNotValidError('Page must be greater than 0');
    }

    if (tam != null && tam < 1) {
      throw new ArgumentNotValidError('Tam must be greater than 0');
    }

    const posts = await this.postRepository.filter(page, tam, type, search);

    const postWithLike = posts.map((post) => {
      return {
        ...post,
        isLiked: post.Like.some((like) => like.user.id === userId),
      };
    });

    return { posts: postWithLike };
  }
}
