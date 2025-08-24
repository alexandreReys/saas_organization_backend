import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  findById(idUser: number): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findAll(): Promise<UserEntity[]>;
  create(user: Partial<UserEntity>): Promise<UserEntity>;
  update(idUser: number, user: Partial<UserEntity>): Promise<UserEntity>;
  delete(idUser: number): Promise<void>;
}
