import { IsBoolean, IsInt, IsOptional} from "class-validator";

export class CreateDetallesFacturaDto {

  @IsInt()
  cantidad: number;

  @IsInt()
  productoId: number;

  @IsInt()
  @IsOptional()
  facturaId?: number;

  @IsBoolean()
  @IsOptional()
  disponible?: boolean;
  
  @IsInt()
  @IsOptional()
  id?: number; 
}