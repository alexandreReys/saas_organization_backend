import { IOrganizationRepository } from '../../domain/repositories/organization.repository.interface';
import { OrganizationEntity } from '../../domain/entities/organization.entity';

export class UpdateOrganizationUseCase {
  constructor(
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  async execute(
    id: number,
    data: Partial<OrganizationEntity>,
  ): Promise<OrganizationEntity> {
    return this.organizationRepository.update(id, data);
  }
}
