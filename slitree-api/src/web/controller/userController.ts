import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { PrismaUserRepository } from '../../repository/prisma/prismaUserRepository';
import { RegisterUserService } from '../../service/user/register-user-service';
import { GetUserService } from '../../service/user/get-user-service';

export class UserController {
  async register(req: FastifyRequest, rep: FastifyReply) {
    const reqSchema = z.object({
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email({
          message: 'Invalid email',
        }),
      name: z.string({
        required_error: 'Name is required',
      }),
      password: z
        .string({
          required_error: 'Password is required',
        })
        .min(6, {
          message: 'Password must have at least 6 characters',
        }),
    });

    const { email, name, password } = reqSchema.parse(req.body);

    const userRepository = new PrismaUserRepository();
    const registerUserService = new RegisterUserService(userRepository);

    const { user } = await registerUserService.execute({
      email,
      name,
      password,
    });

    rep.status(201).send({ user });
  }

  async get(req: FastifyRequest, rep: FastifyReply) {
    const userId = req.user.sub;

    const userRepository = new PrismaUserRepository();

    const getUserService = new GetUserService(userRepository);

    const { user } = await getUserService.execute({ userId });

    return rep.status(200).send({ user });
  }
}
