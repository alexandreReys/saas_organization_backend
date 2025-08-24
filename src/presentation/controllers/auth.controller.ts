import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginDto } from '../../application/dtos/login.dto';
import { LoginUseCase } from '../../application/use-cases/login.usecase';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    try {
      return await this.loginUseCase.execute(body.email, body.password);
    } catch {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}
