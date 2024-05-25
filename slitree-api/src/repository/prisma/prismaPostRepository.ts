import { PostType, Prisma } from '@prisma/client';
import { PostRepository } from '../interface/postRepository';
import { prisma } from '../../lib/prisma';
import { ResourceNotFoundError } from '../../service/errors/resource-not-found-error';

export class PrismaPostRepository implements PostRepository {
  async createPost(data: Prisma.PostUncheckedCreateInput) {
    const post = await prisma.post.create({
      data,
    });

    return post;
  }

  async findAll() {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
        type: true,
        author: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        Like: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return posts;
  }

  async filter(
    page = 1,
    tam = 5,
    type?: PostType | undefined,
    search?: string,
  ) {
    tam = Number(tam);
    page = Number(page);

    const whereClause: any = {};

    if (type) {
      whereClause.type = type;
    }

    if (search) {
      whereClause.OR = [
        {
          title: {
            contains: search,
          },
        },
        {
          description: {
            contains: search,
          },
        },
        {
          author: {
            name: {
              contains: search,
            },
          },
        },
      ];
    }

    const paginationClause = {
      skip: (page - 1) * tam,
      take: Number(tam),
    };

    const posts = await prisma.post.findMany({
      where: whereClause,
      ...paginationClause,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
        type: true,
        author: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        Like: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return posts;
  }

  async findById(id: string) {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        type: true,
        author: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        Like: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!post) {
      throw new ResourceNotFoundError('Post not found');
    }

    return post;
  }

  async delete(id: string) {
    await prisma.post.delete({
      where: {
        id,
      },

      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        type: true,
        author: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });
  }

  async update(data: Prisma.PostUncheckedUpdateInput) {
    const post = await prisma.post.update({
      where: {
        id: data.id as string,
      },
      data,
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        type: true,
        author: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        Like: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return post;
  }
}
