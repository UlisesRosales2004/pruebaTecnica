import { IsString, IsBoolean, IsDateString, IsOptional, MinLength, IsEmail } from 'class-validator';

export class CreateUsuarioDto {
  @IsDateString()
  @IsOptional()
  fechaNacimiento?: Date;

  @IsString()
  @IsOptional()
  dni?: string;

  @IsString()
  nombreCompleto: string;

  @IsString()
  @IsOptional()
  sexo?: string;

  @IsString()
  @IsOptional()
  estadoCivil?: string;

  @IsBoolean()
  @IsOptional()
  disponible?: boolean;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
