import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppService } from './app.service';
import { OrganizationController } from './presentation/controllers/organization.controller';
import { PrismaService } from './infrastructure/database/prisma.service';
import { OrganizationPrismaRepository } from './infrastructure/repositories/organization-prisma.repository';
import { CreateOrganizationUseCase } from './application/use-cases/create-organization.usecase';
import { FindAllOrganizationsUseCase } from './application/use-cases/find-all-organizations.usecase';
import { FindOrganizationByIdUseCase } from './application/use-cases/find-organization-by-id.usecase';
import { UpdateOrganizationUseCase } from './application/use-cases/update-organization.usecase';
import { DeleteOrganizationUseCase } from './application/use-cases/delete-organization.usecase';
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
  controllers: [AppController, OrganizationController, AuthController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: 'IOrganizationRepository',
      useClass: OrganizationPrismaRepository,
    },
    CreateOrganizationUseCase,
    FindAllOrganizationsUseCase,
    FindOrganizationByIdUseCase,
    UpdateOrganizationUseCase,
    DeleteOrganizationUseCase,
    AuthService,
    LoginUseCase,
  ],
})
export class AppModule {}
