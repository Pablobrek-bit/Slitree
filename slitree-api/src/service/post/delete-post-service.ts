import { PostWithoutAuthorId } from '../../@types/post-without-author-id';
import { PostRepository } from '../../repository/interface/postRepository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { UnauthorizedError } from '../errors/unauthorized-error';

interface DeletePostServiceRequest {
  id: string;
  userId: string;
}

interface DeletePostServiceResponse {
  post: PostWithoutAuthorId;
}

export class DeletePostService {
  constructor(private postRepository: PostRepository) {}

  async execute({
    id,
    userId,
  }: DeletePostServiceRequest): Promise<DeletePostServiceResponse> {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new ResourceNotFoundError('Post not found');
    }

    if (post.author.id !== userId) {
      throw new UnauthorizedError();
    }

    await this.postRepository.delete(id);

    return { post };
  }
}
