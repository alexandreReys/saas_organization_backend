import { IOrganizationRepository } from '../../domain/repositories/organization.repository.interface';

export class DeleteOrganizationUseCase {
  constructor(
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  async execute(id: number): Promise<void> {
    return this.organizationRepository.delete(id);
  }
}
