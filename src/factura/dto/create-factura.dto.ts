import { Type } from 'class-transformer';
import {
  IsString,
  IsBoolean,
  IsInt,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { CreateDetallesFacturaDto } from 'src/detalles-factura/dto/create-detalles-factura.dto';

export class CreateFacturaDto {

  @IsString()
  nombreFantasia: string;

  @IsString()
  fechaFundacion: string;

  @IsInt()
  usuarioId: number; 

  @IsBoolean()
  @IsOptional()
  disponible?: boolean;

  @ValidateNested({ each: true })
  @Type(() => CreateDetallesFacturaDto)
  detalles: CreateDetallesFacturaDto[];
}
