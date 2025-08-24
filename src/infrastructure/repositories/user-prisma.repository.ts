import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { UserEntity } from '../../domain/entities/user.entity';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(idUser: number): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { idUser },
    });
    return user ? (user as UserEntity) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? (user as UserEntity) : null;
  }

  async findAll(): Promise<UserEntity[]> {
    return (await this.prisma.user.findMany()) as UserEntity[];
  }

  async create(user: Partial<UserEntity>): Promise<UserEntity> {
    return (await this.prisma.user.create({
      data: user as Prisma.UserCreateInput,
    })) as UserEntity;
  }

  async update(idUser: number, user: Partial<UserEntity>): Promise<UserEntity> {
    return (await this.prisma.user.update({
      where: { idUser },
      data: user as Prisma.UserUpdateInput,
    })) as UserEntity;
  }

  async delete(idUser: number): Promise<void> {
    await this.prisma.user.delete({ where: { idUser } });
  }
}
