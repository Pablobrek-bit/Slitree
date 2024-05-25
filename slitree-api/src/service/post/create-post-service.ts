import { Post, PostType } from '@prisma/client';
import { PostRepository } from '../../repository/interface/postRepository';
import { UserRepository } from '../../repository/interface/userRepository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { getUrlFile, uploadFile } from '../../utils/firebaseUtils';
import { checkFileSize, isImage } from '../../utils/fileUtils';
import { OutdatedMemoryLimits } from '../errors/outdated-memory-limits';
import { InvalidFileFormat } from '../errors/invalid-file-format-error';

interface CreatePostServiceRequest {
  title?: string;
  description?: string;
  type: PostType;
  authorId: string;
  image?: any;
}

interface CreatePostServiceResponse {
  post: Post;
}

export class CreatePostService {
  constructor(
    private postRepository: PostRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    authorId,
    description,
    title,
    type,
    image,
  }: CreatePostServiceRequest): Promise<CreatePostServiceResponse> {
    const user = await this.userRepository.findById(authorId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    let imageUrl = null;

    if (image) {
      const isMemoryLimitExceeded = checkFileSize(image.size);

      if (!isMemoryLimitExceeded) {
        throw new OutdatedMemoryLimits();
      }

      const isImageType = isImage(image.mimetype);

      if (!isImageType) {
        throw new InvalidFileFormat();
      }

      uploadFile(image);

      imageUrl = (await getUrlFile(image.filename)) as string;
    }

    const post = await this.postRepository.createPost({
      title,
      description,
      type,
      authorId,
      imageUrl,
    });

    return {
      post,
    };
  }
}
