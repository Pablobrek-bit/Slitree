import { Prisma, User } from '@prisma/client';

export interface UserRepository {
  registerUser(data: Prisma.UserCreateInput): Promise<User>;

  findByEmail(email: string): Promise<Prisma.UserCreateInput | null>;

  findById(id: string): Promise<User | null>;
}
