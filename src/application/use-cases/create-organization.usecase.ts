import { IOrganizationRepository } from '../../domain/repositories/organization.repository.interface';
import { OrganizationEntity } from '../../domain/entities/organization.entity';

export class CreateOrganizationUseCase {
  constructor(
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  async execute(
    data: Partial<OrganizationEntity>,
  ): Promise<OrganizationEntity> {
    // Validações podem ser adicionadas aqui
    return this.organizationRepository.create(data);
  }
}
