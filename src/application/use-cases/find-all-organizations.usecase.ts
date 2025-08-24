import { IOrganizationRepository } from '../../domain/repositories/organization.repository.interface';
import { OrganizationEntity } from '../../domain/entities/organization.entity';

export class FindAllOrganizationsUseCase {
  constructor(
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  async execute(): Promise<OrganizationEntity[]> {
    return this.organizationRepository.findAll();
  }
}
