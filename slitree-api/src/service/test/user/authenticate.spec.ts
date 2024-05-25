import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUserRepository } from '../../../repository/in-memory/inMemoryUserRepository';
import { AuthenticateUserService } from '../../user/authenticate-user-service';
import { randomUUID } from 'crypto';
import { hash } from 'bcryptjs';
import { InvalidCredentialError } from '../../errors/invalid-credentials-error';

describe('Authenticate service', () => {
  let userRepository: InMemoryUserRepository;
  let authenticateService: AuthenticateUserService;

  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    authenticateService = new AuthenticateUserService(userRepository);

    userRepository.users.push({
      id: randomUUID(),
      name: 'Pedro',
      email: 'pedro@gmail.com',
      createdAt: new Date(),
      password: await hash('123456', 8),
    });
  });

  it('should be able to authenticate user', async () => {
    const { user } = await authenticateService.execute({
      email: 'pedro@gmail.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate user with invalid email', async () => {
    expect(async () => {
      await authenticateService.execute({
        email: 'pedro1@gmail.com',
        password: '123456',
      });
    }).rejects.toBeInstanceOf(InvalidCredentialError);
  });

  it('should not be able to authenticate user with invalid password', async () => {
    expect(async () => {
      await authenticateService.execute({
        email: 'pedro@gmail.com',
        password: '1234567',
      });
    }).rejects.toBeInstanceOf(InvalidCredentialError);
  });
});
