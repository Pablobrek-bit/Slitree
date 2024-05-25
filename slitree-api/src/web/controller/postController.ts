import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { PrismaPostRepository } from '../../repository/prisma/prismaPostRepository';
import { CreatePostService } from '../../service/post/create-post-service';
import { PostType } from '@prisma/client';
import { IndexPostService } from '../../service/post/index-post-service';
import { FilterPostService } from '../../service/post/filter-post-service';
import { ShowPostService } from '../../service/post/show-post-service';
import { DeletePostService } from '../../service/post/delete-post-service';
import { UpdatePostService } from '../../service/post/update-post-service';
import { PrismaUserRepository } from '../../repository/prisma/prismaUserRepository';

export class PostController {
  async create(req: FastifyRequest, rep: FastifyReply) {
    const userId = req.user.sub;
    const image = req.file;
    const reqSchema = z.object({
      title: z.string({
        required_error: 'Title is required',
      }),
      description: z.string({
        required_error: 'Description is required',
      }),
      type: z.enum(['noticia', 'edital', 'divulgacao'], {
        required_error: 'Type is required',
        message: 'Invalid type',
      }),
    });

    const { description, title, type } = reqSchema.parse(req.body);

    const postRepository = new PrismaPostRepository();
    const userRepository = new PrismaUserRepository();
    const createPostService = new CreatePostService(
      postRepository,
      userRepository,
    );

    const { post } = await createPostService.execute({
      authorId: userId,
      description,
      title,
      type: type.toUpperCase() as PostType,
      image,
    });

    rep.code(201).send({ post });
  }

  async index(req: FastifyRequest, rep: FastifyReply) {
    const userId = req.user.sub;

    const postRepository = new PrismaPostRepository();

    const indexPostService = new IndexPostService(postRepository);

    const { posts } = await indexPostService.execute({ userId });

    rep.code(200).send({ posts });
  }

  async filter(req: FastifyRequest, rep: FastifyReply) {
    const { page, tam, type, search } = req.query as {
      page?: number;
      tam?: number;
      type?: string;
      search?: string;
    };

    const userId = req.user.sub;

    const postRepository = new PrismaPostRepository();
    const userRepository = new PrismaUserRepository();

    const filterPostService = new FilterPostService(
      postRepository,
      userRepository,
    );

    const { posts } = await filterPostService.execute({
      userId,
      page,
      tam,
      search,
      type: type?.toUpperCase() as PostType,
    });

    rep.code(200).send({ posts });
  }

  async show(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as { id: string };

    const postRepository = new PrismaPostRepository();
    const showPostService = new ShowPostService(postRepository);

    const { post } = await showPostService.execute({ id });

    rep.code(200).send({ post });
  }

  async delete(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as { id: string };

    const userId = req.user.sub;

    const postRepository = new PrismaPostRepository();
    const deletePostService = new DeletePostService(postRepository);

    await deletePostService.execute({ id, userId });
  }

  async update(req: FastifyRequest, rep: FastifyReply) {
    const reqSchema = z.object({
      title: z
        .string({
          required_error: 'Title is required',
        })
        .optional(),
      description: z
        .string({
          required_error: 'Description is required',
        })
        .optional(),
      type: z
        .enum(['noticia', 'edital', 'divulgacao'], {
          required_error: 'Type is required',
          message: 'Invalid type',
        })
        .optional(),
    });

    const { id } = req.params as { id: string };
    const userId = req.user.sub;

    const { description, title, type } = reqSchema.parse(req.body);

    const postRepository = new PrismaPostRepository();
    const updatePostService = new UpdatePostService(postRepository);

    const { post } = await updatePostService.execute({
      userId,
      description,
      id,
      title,
      type: type?.toUpperCase() as PostType,
    });

    rep.code(200).send({ post });
  }
}
