import { FastifyInstance } from 'fastify';
import { loginRoutes } from './login.routes';
import { postsRoute } from './posts.routes';
import { usersRoutes } from './users.routes';
import { likeRoutes } from './like.routes';

export async function routes(app: FastifyInstance) {
  app.register(loginRoutes, { prefix: '/auth' });
  app.register(usersRoutes, { prefix: '/users' });
  app.register(postsRoute, { prefix: '/posts' });
  app.register(likeRoutes, { prefix: '/likes' });
}
