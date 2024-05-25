import '@fastify/jwt';

export declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string;
    };
  }
}
