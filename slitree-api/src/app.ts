import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import { env } from './env';
import { errorHandler } from './middleware/errorHandler';
import { routes } from './web/routes/routes';
import fastifyMulter from 'fastify-multer';
import cors from '@fastify/cors';

const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(cors, {
  origin: '*',
});

app.register(fastifyMulter.contentParser);

app.setErrorHandler(errorHandler);

app.register(routes);

export { app };
