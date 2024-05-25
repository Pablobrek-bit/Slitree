import { FastifyReply, FastifyRequest } from 'fastify';

export async function verifyJwt(req: FastifyRequest, rep: FastifyReply) {
  await req.jwtVerify();
}
