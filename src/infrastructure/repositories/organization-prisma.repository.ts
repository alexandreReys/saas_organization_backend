import { Injectable } from '@nestjs/common';
import { IOrganizationRepository } from '../../domain/repositories/organization.repository.interface';
import { OrganizationEntity } from '../../domain/entities/organization.entity';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrganizationPrismaRepository implements IOrganizationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(idOrganization: number): Promise<OrganizationEntity | null> {
    const org = await this.prisma.organization.findUnique({
      where: { idOrganization },
    });
    return org ? (org as OrganizationEntity) : null;
  }

  async findByEmail(email: string): Promise<OrganizationEntity | null> {
    const org = await this.prisma.organization.findUnique({ where: { email } });
    return org ? (org as OrganizationEntity) : null;
  }

  async findAll(): Promise<OrganizationEntity[]> {
    return (await this.prisma.organization.findMany()) as OrganizationEntity[];
  }

  async create(
    organization: Partial<OrganizationEntity>,
  ): Promise<OrganizationEntity> {
    // Omitir campos não permitidos na criação
    // Passar organization diretamente, assumindo que o DTO já omite campos indesejados
    return (await this.prisma.organization.create({
      data: organization as Prisma.OrganizationCreateInput,
    })) as OrganizationEntity;
  }

  async update(
    idOrganization: number,
    organization: Partial<OrganizationEntity>,
  ): Promise<OrganizationEntity> {
    // Omitir campos não permitidos na atualização
    return (await this.prisma.organization.update({
      where: { idOrganization },
      data: organization as Prisma.OrganizationUpdateInput,
    })) as OrganizationEntity;
  }

  async delete(idOrganization: number): Promise<void> {
    await this.prisma.organization.delete({ where: { idOrganization } });
  }
}
