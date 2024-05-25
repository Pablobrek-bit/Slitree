import { LikeRepository } from '../../repository/interface/likeRepository';
import { PostRepository } from '../../repository/interface/postRepository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface CountLikeServiceRequest {
  postId: string;
}

interface CountLikeServiceResponse {
  likeCount: number;
}

export class CountLikeService {
  constructor(
    private likeRepository: LikeRepository,
    private postRepository: PostRepository,
  ) {}

  async execute({
    postId,
  }: CountLikeServiceRequest): Promise<CountLikeServiceResponse> {
    const post = await this.postRepository.findById(postId);

    if (!post) {
      throw new ResourceNotFoundError('Post not found');
    }

    const likeCount = await this.likeRepository.getLikeCount(postId);

    return {
      likeCount,
    };
  }
}
