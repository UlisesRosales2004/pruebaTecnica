import { Injectable } from '@nestjs/common';
import { CreateDetallesFacturaDto } from './dto/create-detalles-factura.dto';
import { UpdateDetallesFacturaDto } from './dto/update-detalles-factura.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DetallesFacturaService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createDetallesFacturaDto: CreateDetallesFacturaDto) {
    const producto = await this.prismaService.producto.findUnique({
      where: { id: createDetallesFacturaDto.productoId },
    });

    if (!producto) {
      throw new Error('Producto no encontrado');
    }

    if (producto.stock < createDetallesFacturaDto.cantidad) {
      throw new Error(
        `Stock insuficiente. Disponible: ${producto.stock}, solicitado: ${createDetallesFacturaDto.cantidad}`,
      );
    }

    const subtotal =
      createDetallesFacturaDto.cantidad * producto.precioUnitario;

    const detalle = await this.prismaService.detallesFactura.create({
      data: {
        ...createDetallesFacturaDto,
        subtotal,
      },
    });

    await this.prismaService.producto.update({
      where: { id: producto.id },
      data: {
        stock: producto.stock - createDetallesFacturaDto.cantidad,
      },
    });

    return detalle;
  }

  async findAll() {
    return await this.prismaService.detallesFactura.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.detallesFactura.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateDetallesFacturaDto: UpdateDetallesFacturaDto) {
    const detalleActual = await this.prismaService.detallesFactura.findUnique({
      where: { id },
      include: { producto: true },
    });

    if (!detalleActual) {
      throw new Error('Detalle no encontrado');
    }

    if (updateDetallesFacturaDto.cantidad === undefined) { //esto lo tuve que poner si o si... por mas de que en tehoria nunca va a ser undefined, pero si no me daba error mas abajo. por que el updateDetallesFacturaDto.cantidad es opcional
      throw new Error('La cantidad es obligatoria para la actualización');
    }

    const producto = detalleActual.producto;

    let stockDisponible = producto.stock + detalleActual.cantidad;

    if (stockDisponible < updateDetallesFacturaDto.cantidad) {
      throw new Error(
        `Stock insuficiente. Disponible: ${stockDisponible}, solicitado: ${updateDetallesFacturaDto.cantidad}`,
      );
    }

    const subtotal =
      updateDetallesFacturaDto.cantidad * producto.precioUnitario;

    const detalleActualizado = await this.prismaService.detallesFactura.update({
      where: { id },
      data: {
        ...updateDetallesFacturaDto,
        subtotal,
      },
    });

    await this.prismaService.producto.update({
      where: { id: producto.id },
      data: {
        stock: stockDisponible - updateDetallesFacturaDto.cantidad,
      },
    });

    return detalleActualizado;
  }

  async remove(id: number) {
    // Buscamos el detalle con el producto asociado
    const detalle = await this.prismaService.detallesFactura.findUnique({
      where: { id },
      include: { producto: true },
    });

    if (!detalle) {
      throw new Error('Detalle no encontrado');
    }

    if (detalle.eliminado) {
      throw new Error('El detalle ya fue eliminado');
    }

    // Sumamos la cantidad del detalle al stock del producto
    await this.prismaService.producto.update({
      where: { id: detalle.productoId },
      data: {
        stock: detalle.producto.stock + detalle.cantidad,
      },
    });

    // Marcamos el detalle como eliminado
    return await this.prismaService.detallesFactura.update({
      where: { id },
      data: { eliminado: true },
    });
  }
}
