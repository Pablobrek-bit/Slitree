import { FastifyInstance } from 'fastify';
import { verifyJwt } from '../../middleware/verify-jwt';
import { LikeController } from '../controller/likeController';

export async function likeRoutes(app: FastifyInstance) {
  const likeController = new LikeController();

  app.post('/:postId', { preHandler: verifyJwt }, likeController.create);
  app.get('/:postId/count', likeController.getLikeCount);
}
