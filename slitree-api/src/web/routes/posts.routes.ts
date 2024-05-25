import { FastifyInstance } from 'fastify';
import { PostController } from '../controller/postController';
import { verifyJwt } from '../../middleware/verify-jwt';
import { upload } from '../../config/multerConfig';

export async function postsRoute(app: FastifyInstance) {
  const postController = new PostController();

  app.post(
    '/',
    { preHandler: [verifyJwt, upload.single('image')] },
    postController.create,
  );

  app.get('/index', { preHandler: verifyJwt }, postController.index);

  app.get('/filter', { preHandler: verifyJwt }, postController.filter);

  app.get('/:id', { preHandler: verifyJwt }, postController.show);

  app.delete('/:id', { preHandler: verifyJwt }, postController.delete);

  app.put('/:id', { preHandler: verifyJwt }, postController.update);
}
