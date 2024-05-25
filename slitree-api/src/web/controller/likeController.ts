import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaLikeRepository } from '../../repository/prisma/prismaLikeRepository';
import { CreateLikeService } from '../../service/like/create-like-service';
import { PrismaPostRepository } from '../../repository/prisma/prismaPostRepository';
import { CountLikeService } from '../../service/like/count-like-service';

export class LikeController {
  async create(req: FastifyRequest, rep: FastifyReply) {
    const { postId } = req.params as { postId: string };

    const userId = req.user.sub;

    const likeRepository = new PrismaLikeRepository();
    const postRepository = new PrismaPostRepository();

    const createLikeService = new CreateLikeService(
      likeRepository,
      postRepository,
    );

    await createLikeService.execute({ postId, userId });

    rep.status(201).send();
  }

  async getLikeCount(req: FastifyRequest, rep: FastifyReply) {
    const { postId } = req.params as { postId: string };

    const likeRepository = new PrismaLikeRepository();
    const postRepository = new PrismaPostRepository();

    const countLikeService = new CountLikeService(
      likeRepository,
      postRepository,
    );

    const { likeCount } = await countLikeService.execute({ postId });

    rep.status(200).send({ likeCount });
  }
}
