import { IUserRepository } from '../../domain/repositories/user.repository.interface';

export class DeleteUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: number): Promise<void> {
    return this.userRepository.delete(id);
  }
}
