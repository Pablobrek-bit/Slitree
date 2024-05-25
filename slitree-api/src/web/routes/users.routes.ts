import { FastifyInstance } from 'fastify';
import { UserController } from '../controller/userController';
import { verifyJwt } from '../../middleware/verify-jwt';

export async function usersRoutes(app: FastifyInstance) {
  const userController = new UserController();

  app.post('/register', userController.register);

  app.get('/', { preHandler: verifyJwt }, userController.get);
}
