import { PostRepository } from '../../repository/interface/postRepository';
import { PostWithLike } from '../../@types/post-without-author-id';

interface IndexPostServiceRequest {
  userId: string;
}

interface IndexPostServiceResponse {
  posts: PostWithLike[];
}

export class IndexPostService {
  constructor(private postRepository: PostRepository) {}

  async execute({
    userId,
  }: IndexPostServiceRequest): Promise<IndexPostServiceResponse> {
    const posts = await this.postRepository.findAll();

    const postWithLike = posts.map((post) => {
      return {
        ...post,
        isLiked: post.Like.some((like) => like.user.id === userId),
      };
    });

    return { posts: postWithLike };
  }
}
