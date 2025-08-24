import { IOrganizationRepository } from '../../domain/repositories/organization.repository.interface';
import { AuthService } from '../services/auth.service';

export class LoginUseCase {
  constructor(
    private readonly organizationRepository: IOrganizationRepository,
    private readonly authService: AuthService,
  ) {}

  async execute(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const organization = await this.organizationRepository.findByEmail(email);
    if (!organization) {
      throw new Error('Invalid credentials');
    }
    const passwordValid = await this.authService.comparePasswords(
      password,
      organization.password,
    );
    if (!passwordValid) {
      throw new Error('Invalid credentials');
    }
    const payload = {
      sub: organization.idOrganization,
      email: organization.email,
      role: organization.roleOrganization,
    };
    const accessToken = await this.authService.generateToken(payload);
    return { accessToken };
  }
}
