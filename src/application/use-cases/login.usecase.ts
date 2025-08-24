import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { AuthService } from '../services/auth.service';

export class LoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly authService: AuthService,
  ) {}

  async execute(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const passwordValid = await this.authService.comparePasswords(
      password,
      user.password,
    );
    if (!passwordValid) {
      throw new Error('Invalid credentials');
    }
    const payload = {
      sub: user.idUser,
      email: user.email,
      role: user.role,
    };
    const accessToken = await this.authService.generateToken(payload);
    return { accessToken };
  }
}
