import { PostType } from '@prisma/client';
import { PostRepository } from '../../repository/interface/postRepository';
import { PostWithoutAuthorId } from '../../@types/post-without-author-id';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { UnauthorizedError } from '../errors/unauthorized-error';

interface UpdatePostServiceRequest {
  id: string;
  userId: string;
  title?: string;
  description?: string;
  type?: PostType;
}

interface UpdatePostServiceResponse {
  post: PostWithoutAuthorId;
}

export class UpdatePostService {
  constructor(private postRepository: PostRepository) {}

  async execute({
    id,
    userId,
    description,
    title,
    type,
  }: UpdatePostServiceRequest): Promise<UpdatePostServiceResponse> {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new ResourceNotFoundError();
    }

    if (post.author.id !== userId) {
      throw new UnauthorizedError();
    }

    const updatedPost = await this.postRepository.update({
      id,
      description,
      title,
      type,
    });

    return { post: updatedPost };
  }
}
