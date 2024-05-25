import { PostWithLike } from '../../@types/post-without-author-id';
import { PostRepository } from '../../repository/interface/postRepository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface ShowPostServiceRequest {
  id: string;
}

interface ShowPostServiceResponse {
  post: PostWithLike;
}

export class ShowPostService {
  constructor(private postRepository: PostRepository) {}

  async execute({
    id,
  }: ShowPostServiceRequest): Promise<ShowPostServiceResponse> {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new ResourceNotFoundError('Post not found');
    }

    return { post };
  }
}
