import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { UserEntity } from '../../domain/entities/user.entity';

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: Partial<UserEntity>): Promise<UserEntity> {
    // Validações podem ser adicionadas aqui
    return this.userRepository.create(data);
  }
}
