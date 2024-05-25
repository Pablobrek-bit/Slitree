import { User } from '@prisma/client';
import { UserRepository } from '../../repository/interface/userRepository';
import { InvalidCredentialError } from '../errors/invalid-credentials-error';

interface GetUserServiceRequest {
  userId: string;
}

interface GetUserServiceResponse {
  user: User;
}

export class GetUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
  }: GetUserServiceRequest): Promise<GetUserServiceResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new InvalidCredentialError();
    }

    return { user };
  }
}
