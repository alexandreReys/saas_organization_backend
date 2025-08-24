import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateOrganizationDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  nameOrganization: string;

  @IsString()
  @IsOptional()
  roleOrganization?: string;

  @IsBoolean()
  @IsOptional()
  statusOrganization?: boolean;
}
