import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { UserEntity } from '../../domain/entities/user.entity';

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: number, data: Partial<UserEntity>): Promise<UserEntity> {
    return this.userRepository.update(id, data);
  }
}
