//
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { FindAllOrganizationsUseCase } from '../../application/use-cases/find-all-organizations.usecase';
import { CreateOrganizationUseCase } from '../../application/use-cases/create-organization.usecase';
import { FindOrganizationByIdUseCase } from '../../application/use-cases/find-organization-by-id.usecase';
import { UpdateOrganizationUseCase } from '../../application/use-cases/update-organization.usecase';
import { DeleteOrganizationUseCase } from '../../application/use-cases/delete-organization.usecase';
import { OrganizationEntity } from '../../domain/entities/organization.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('organizations')
export class OrganizationController {
  constructor(
    @Inject(CreateOrganizationUseCase)
    private readonly createUseCase: CreateOrganizationUseCase,
    @Inject(FindAllOrganizationsUseCase)
    private readonly findAllUseCase: FindAllOrganizationsUseCase,
    @Inject(FindOrganizationByIdUseCase)
    private readonly findByIdUseCase: FindOrganizationByIdUseCase,
    @Inject(UpdateOrganizationUseCase)
    private readonly updateUseCase: UpdateOrganizationUseCase,
    @Inject(DeleteOrganizationUseCase)
    private readonly deleteUseCase: DeleteOrganizationUseCase,
  ) {}

  @Post()
  async create(@Body() body: Partial<OrganizationEntity>) {
    return this.createUseCase.execute(body);
  }

  @Get()
  async findAll() {
    return this.findAllUseCase.execute();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const org = await this.findByIdUseCase.execute(Number(id));
    if (!org) {
      throw new HttpException('Organization not found', HttpStatus.NOT_FOUND);
    }
    return org;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: Partial<OrganizationEntity>,
  ) {
    return this.updateUseCase.execute(Number(id), body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteUseCase.execute(Number(id));
    return { message: 'Organization deleted' };
  }
}
