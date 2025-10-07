import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductoModule } from './producto/producto.module';
import { DetallesFacturaModule } from './detalles-factura/detalles-factura.module';
import { UsuarioModule } from './usuario/usuario.module';
import { FacturaModule } from './factura/factura.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ProductoModule, DetallesFacturaModule, UsuarioModule, FacturaModule, AuthModule, ConfigModule.forRoot({
      isGlobal: true,
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
