import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppService } from './app.service';
import { UserController } from './presentation/controllers/user.controller';
import { PrismaService } from './infrastructure/database/prisma.service';
import { UserPrismaRepository } from './infrastructure/repositories/user-prisma.repository';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { FindAllUsersUseCase } from './application/use-cases/find-all-users.usecase';
import { FindUserByIdUseCase } from './application/use-cases/find-user-by-id.usecase';
import { UpdateUserUseCase } from './application/use-cases/update-user.usecase';
import { DeleteUserUseCase } from './application/use-cases/delete-user.usecase';
import { AuthService } from './application/services/auth.service';
import { LoginUseCase } from './application/use-cases/login.usecase';
import { AuthController } from './presentation/controllers/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRE_TIME') },
      }),
      inject: [ConfigService],
    }),

    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60, // tempo em segundos
          limit: 10, // máximo de 10 requisições por minuto por IP
        },
      ],
    }),
  ],
  controllers: [AppController, UserController, AuthController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: 'IUserRepository',
      useClass: UserPrismaRepository,
    },
    CreateUserUseCase,
    FindAllUsersUseCase,
    FindUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    AuthService,
    LoginUseCase,
  ],
})
export class AppModule {}
