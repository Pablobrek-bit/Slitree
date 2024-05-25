import { prisma } from '../../lib/prisma';
import { LikeRepository } from '../interface/likeRepository';

export class PrismaLikeRepository implements LikeRepository {
  async createLike(postId: string, userId: string) {
    await prisma.like.create({
      data: {
        post: {
          connect: {
            id: postId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async deleteLike(postId: string, userId: string) {
    await prisma.like.deleteMany({
      where: {
        postId,
        userId,
      },
    });
  }

  async findByPostIdAndUserId(postId: string, userId: string) {
    const like = await prisma.like.findFirst({
      where: {
        postId,
        userId,
      },
    });

    return !!like;
  }

  async getLikeCount(postId: string) {
    const likeCount = await prisma.like.count({
      where: {
        postId,
      },
    });

    return likeCount;
  }
}
