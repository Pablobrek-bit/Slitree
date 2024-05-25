import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUserRepository } from '../../../repository/in-memory/inMemoryUserRepository';
import { RegisterUserService } from '../../user/register-user-service';
import { InvalidCredentialError } from '../../errors/invalid-credentials-error';

describe('Register service', () => {
  let userRepository: InMemoryUserRepository;
  let registerService: RegisterUserService;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    registerService = new RegisterUserService(userRepository);
  });

  it('should be able to register user', async () => {
    expect(async () => {
      await registerService.execute({
        name: 'Pedro',
        email: 'pedro@gmail.com',
        password: '123456',
      });
    }).not.toThrow();
  });

  it('should not be able to register user with same email', async () => {
    await registerService.execute({
      name: 'Pedro',
      email: 'pedro@gmail.com',
      password: '123456',
    });

    expect(async () => {
      await registerService.execute({
        name: 'Pedro2',
        email: 'pedro@gmail.com',
        password: '123456',
      });
    }).rejects.toBeInstanceOf(InvalidCredentialError);
  });
});
