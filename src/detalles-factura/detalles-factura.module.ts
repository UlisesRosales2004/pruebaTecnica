import { Module } from '@nestjs/common';
import { DetallesFacturaService } from './detalles-factura.service';
/* import { DetallesFacturaController } from './detalles-factura.controller';
 */import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
/*   controllers: [DetallesFacturaController],
 */  providers: [DetallesFacturaService, PrismaService],
  exports: [DetallesFacturaService],
  imports: [AuthModule],
}) 
export class DetallesFacturaModule {}
