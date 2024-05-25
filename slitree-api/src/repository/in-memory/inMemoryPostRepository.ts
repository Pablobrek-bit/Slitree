import { Prisma, $Enums } from '@prisma/client';
import {
  PostWithLike,
  PostWithoutAuthorId,
} from '../../@types/post-without-author-id';
import { PostRepository } from '../interface/postRepository';
import { randomUUID } from 'crypto';

export class InMemoryPostRepository implements PostRepository {
  public posts: PostWithLike[] = [];

  async createPost(data: Prisma.PostUncheckedCreateInput) {
    const post = {
      id: randomUUID(),
      title: data.title ?? null,
      description: data.description ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: data.imageUrl ?? null,
      type: data.type,
      authorId: data.authorId,
      Like: [],
    };

    this.posts.push(post);

    return post;
  }
  async findAll() {
    return this.posts;
  }
  async filter(
    page?: number | undefined,
    tam?: number | undefined,
    type?: $Enums.PostType | undefined,
    search?: string | undefined,
  ) {
    let posts = this.posts;
    if (type) {
      posts = posts.filter((post) => post.type === type);
    }

    if (search) {
      posts = posts.filter((post) =>
        post.title?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (page && tam) {
      const start = (page - 1) * tam;
      const end = start + tam;

      posts = posts.slice(start, end);
    }

    return posts;
  }
  async findById(id: string) {
    let post = this.posts.find((post) => post.id === id);

    if (post) {
      post.author = { id: post.authorId };
      delete post.authorId;
    }

    return post as PostWithLike;
  }
  async delete(id: string) {
    const index = this.posts.findIndex((post) => post.id === id);

    this.posts.splice(index, 1);
  }
  async update(data: Prisma.PostUncheckedUpdateInput) {
    const post = this.posts.find((post) => post.id === data.id);

    const updatedPost = {
      ...post,
      title: data.title ?? post?.title,
      description: data.description ?? post?.description,
      type: data.type ?? post?.type,
      updatedAt: new Date(),
      Like: post?.Like ?? [],
    };

    const index = this.posts.findIndex((post) => post.id === data.id);

    this.posts[index] = updatedPost;

    return updatedPost;
  }
}
