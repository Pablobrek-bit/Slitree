import { UserRepository } from '../../repository/interface/userRepository';
import { hash } from 'bcryptjs';
import { InvalidCredentialError } from '../errors/invalid-credentials-error';
import { User } from '@prisma/client';

interface RegisterUserServiceRequest {
  email: string;
  name: string;
  password: string;
}

interface RegisterUserServiceResponse {
  user: User;
}

export class RegisterUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    name,
    password,
  }: RegisterUserServiceRequest): Promise<RegisterUserServiceResponse> {
    const isUserAlreadyExists = await this.userRepository.findByEmail(email);

    if (isUserAlreadyExists) {
      throw new InvalidCredentialError('User already exists');
    }

    const passwordHash = await hash(password, 8);
    const user = await this.userRepository.registerUser({
      email,
      name,
      password: passwordHash,
    });

    return {
      user,
    };
  }
}
