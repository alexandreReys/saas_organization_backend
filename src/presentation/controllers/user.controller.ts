//
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { FindAllUsersUseCase } from '../../application/use-cases/find-all-users.usecase';
import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';
import { FindUserByIdUseCase } from '../../application/use-cases/find-user-by-id.usecase';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.usecase';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.usecase';
import { UserEntity } from '../../domain/entities/user.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    @Inject(CreateUserUseCase)
    private readonly createUseCase: CreateUserUseCase,
    @Inject(FindAllUsersUseCase)
    private readonly findAllUseCase: FindAllUsersUseCase,
    @Inject(FindUserByIdUseCase)
    private readonly findByIdUseCase: FindUserByIdUseCase,
    @Inject(UpdateUserUseCase)
    private readonly updateUseCase: UpdateUserUseCase,
    @Inject(DeleteUserUseCase)
    private readonly deleteUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  async create(@Body() body: Partial<UserEntity>) {
    return this.createUseCase.execute(body);
  }

  @Get()
  async findAll() {
    return this.findAllUseCase.execute();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const user = await this.findByIdUseCase.execute(Number(id));
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: Partial<UserEntity>) {
    return this.updateUseCase.execute(Number(id), body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteUseCase.execute(Number(id));
    return { message: 'User deleted' };
  }
}
