import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { UserEntity } from '../../domain/entities/user.entity';

export class FindUserByIdUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: number): Promise<UserEntity | null> {
    return this.userRepository.findById(id);
  }
}
