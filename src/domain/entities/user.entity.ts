export class UserEntity {
  constructor(
    public readonly idUser: number,
    public readonly email: string,
    public readonly password: string,
    public readonly name: string,
    public readonly role: string,
    public readonly status: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  public static create(data: {
    email: string;
    password: string;
    name: string;
    role?: string;
    status?: boolean;
  }): Partial<UserEntity> {
    return {
      email: data.email,
      password: data.password,
      name: data.name,
      role: data.role || 'admin',
      status: data.status ?? true,
    };
  }

  public isActive(): boolean {
    return this.status;
  }

  public hasRole(role: string): boolean {
    return this.role === role;
  }
}
