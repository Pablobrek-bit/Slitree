import { Prisma, User } from '@prisma/client';
import { UserRepository } from '../interface/userRepository';
import { randomUUID } from 'crypto';

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  async registerUser(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      email: data.email,
      name: data.name,
      password: data.password,
      createdAt: new Date(),
    };

    this.users.push(user);

    return user;
  }
  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);

    return user || null;
  }

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id);

    return user || null;
  }
}
