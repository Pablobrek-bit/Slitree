import { PostWithoutAuthorId } from '../../@types/post-without-author-id';
import { LikeRepository } from '../../repository/interface/likeRepository';
import { PostRepository } from '../../repository/interface/postRepository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface CreateLikeServiceRequest {
  postId: string;
  userId: string;
}

interface CreateLikeServiceResponse {
  post: PostWithoutAuthorId;
}

export class CreateLikeService {
  constructor(
    private likeRepository: LikeRepository,
    private postRepository: PostRepository,
  ) {}

  async execute({
    postId,
    userId,
  }: CreateLikeServiceRequest): Promise<CreateLikeServiceResponse> {
    const post = await this.postRepository.findById(postId);

    if (!post) {
      throw new ResourceNotFoundError('Post not found');
    }

    const likeExists = await this.likeRepository.findByPostIdAndUserId(
      postId,
      userId,
    );

    if (likeExists) {
      await this.likeRepository.deleteLike(postId, userId);
      return { post };
    }

    await this.likeRepository.createLike(postId, userId);

    return { post };
  }
}
