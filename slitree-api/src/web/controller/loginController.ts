import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaUserRepository } from '../../repository/prisma/prismaUserRepository';
import z from 'zod';
import { AuthenticateUserService } from '../../service/user/authenticate-user-service';

export class LoginController {
  async authenticate(req: FastifyRequest, rep: FastifyReply) {
    const reqSchema = z.object({
      email: z
        .string({ required_error: 'Email is required' })
        .email({ message: 'Invalid email' }),
      password: z.string().min(6, {
        message: 'Password must have at least 6 characters',
      }),
    });

    const { email, password } = reqSchema.parse(req.body);

    const userRepository = new PrismaUserRepository();
    const authenticateUserService = new AuthenticateUserService(userRepository);

    const { user } = await authenticateUserService.execute({
      email,
      password,
    });

    const token = await rep.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: '1h',
        },
      },
    );

    rep.status(200).send({ user, token });
  }
}
