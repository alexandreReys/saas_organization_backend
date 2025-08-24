import { IOrganizationRepository } from '../../domain/repositories/organization.repository.interface';
import { OrganizationEntity } from '../../domain/entities/organization.entity';

export class FindOrganizationByIdUseCase {
  constructor(
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  async execute(id: number): Promise<OrganizationEntity | null> {
    return this.organizationRepository.findById(id);
  }
}
