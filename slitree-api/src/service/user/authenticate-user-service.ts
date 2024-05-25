import { compare } from 'bcryptjs';
import { UserRepository } from '../../repository/interface/userRepository';
import { InvalidCredentialError } from '../errors/invalid-credentials-error';

interface AuthenticateUserServiceResquest {
  email: string;
  password: string;
}

interface AuthenticateUserServiceResponse {
  user: {
    id: string | undefined;
    name: string;
    email: string;
  };
}

export class AuthenticateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUserServiceResquest): Promise<AuthenticateUserServiceResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialError();
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new InvalidCredentialError();
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
