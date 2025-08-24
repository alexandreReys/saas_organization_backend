import { OrganizationEntity } from '../entities/organization.entity';

export interface IOrganizationRepository {
  findById(idOrganization: number): Promise<OrganizationEntity | null>;
  findByEmail(email: string): Promise<OrganizationEntity | null>;
  findAll(): Promise<OrganizationEntity[]>;
  create(
    organization: Partial<OrganizationEntity>,
  ): Promise<OrganizationEntity>;
  update(
    idOrganization: number,
    organization: Partial<OrganizationEntity>,
  ): Promise<OrganizationEntity>;
  delete(idOrganization: number): Promise<void>;
}
