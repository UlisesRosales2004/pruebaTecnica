import { Module } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { FacturaController } from './factura.controller';
import { PrismaService } from 'src/prisma.service';
import { DetallesFacturaModule } from 'src/detalles-factura/detalles-factura.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [FacturaController],
  providers: [FacturaService, PrismaService],
  imports: [DetallesFacturaModule, AuthModule],
})
export class FacturaModule {}
