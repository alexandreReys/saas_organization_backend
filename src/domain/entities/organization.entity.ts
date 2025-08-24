export class OrganizationEntity {
  constructor(
    public readonly idOrganization: number,
    public readonly email: string,
    public readonly password: string,
    public readonly nameOrganization: string,
    public readonly roleOrganization: string,
    public readonly statusOrganization: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  public static create(data: {
    email: string;
    password: string;
    nameOrganization: string;
    roleOrganization?: string;
    statusOrganization?: boolean;
  }): Partial<OrganizationEntity> {
    return {
      email: data.email,
      password: data.password,
      nameOrganization: data.nameOrganization,
      roleOrganization: data.roleOrganization || 'admin',
      statusOrganization: data.statusOrganization ?? true,
    };
  }

  public isActive(): boolean {
    return this.statusOrganization;
  }

  public hasRole(role: string): boolean {
    return this.roleOrganization === role;
  }
}
