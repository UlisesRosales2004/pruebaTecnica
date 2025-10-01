import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductoModule } from './producto/producto.module';
import { DetallesFacturaModule } from './detalles-factura/detalles-factura.module';
import { UsuarioModule } from './usuario/usuario.module';
import { FacturaModule } from './factura/factura.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductoModule, DetallesFacturaModule, UsuarioModule, FacturaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
