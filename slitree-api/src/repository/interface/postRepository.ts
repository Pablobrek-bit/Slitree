import { Post, PostType, Prisma } from '@prisma/client';
import {
  PostWithoutAuthorId,
  PostWithLike,
} from '../../@types/post-without-author-id';

export interface PostRepository {
  createPost(data: Prisma.PostUncheckedCreateInput): Promise<Post>;

  findAll(): Promise<PostWithLike[]>;

  filter(
    page?: number,
    tam?: number,
    type?: PostType,
    search?: string,
  ): Promise<PostWithLike[]>;

  findById(id: string): Promise<PostWithLike>;

  delete(id: string): Promise<void>;

  update(data: Prisma.PostUncheckedUpdateInput): Promise<PostWithoutAuthorId>;
}
