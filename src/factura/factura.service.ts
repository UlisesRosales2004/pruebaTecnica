import { Injectable } from '@nestjs/common';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { PrismaService } from 'src/prisma.service';
import { DetallesFacturaService } from 'src/detalles-factura/detalles-factura.service';
import { DetallesFactura } from '@prisma/client';

@Injectable()
export class FacturaService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly detallesFacturaService: DetallesFacturaService,
  ) {}

  async create(createFacturaDto: CreateFacturaDto) {
    const factura = await this.prismaService.factura.create({
      data: {
        nombreFantasia: createFacturaDto.nombreFantasia,
        fechaFundacion: createFacturaDto.fechaFundacion,
        usuarioId: createFacturaDto.usuarioId,
        disponible: createFacturaDto.disponible,
        total: 0, // Inicialmente 0, se actualizará después
      },
    });

    const detallesCreados: DetallesFactura[] = [];
    //Crear los detalles usando el service de detalles
    for (const detalle of createFacturaDto.detalles) {
      const detalleCreado = await this.detallesFacturaService.create({
        ...detalle,
        facturaId: factura.id,
      });
      detallesCreados.push(detalleCreado);
    }

    // Calcular el total sumando los subtotales de los detalles creados
    let total = 0;
    for (const detalle of detallesCreados) {
      total += detalle.subtotal;
    }

    const facturaActualizada = await this.prismaService.factura.update({
      where: { id: factura.id },
      data: { total },
      include: { detallesFactura: true },
    });

    return facturaActualizada;
  }

  async findAll() {
    return await this.prismaService.factura.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.factura.findUnique({
      where: { id },
      include: { detallesFactura: true },
    });
  }

  async update(id: number, updateFacturaDto: UpdateFacturaDto) {
    await this.prismaService.factura.update({
      where: { id },
      data: {
        nombreFantasia: updateFacturaDto.nombreFantasia,
        fechaFundacion: updateFacturaDto.fechaFundacion,
        usuarioId: updateFacturaDto.usuarioId,
        disponible: updateFacturaDto.disponible,
      },
    });

    const detallesActuales = await this.prismaService.detallesFactura.findMany({
      where: { facturaId: id, eliminado: false },
    });

    for (const detalle of detallesActuales) {
      await this.detallesFacturaService.remove(detalle.id);
    }

    if (updateFacturaDto.detalles === undefined) {
      throw new Error('La lista de detalles es obligatoria');
    }

    const nuevosDetalles: DetallesFactura[] = [];
    for (const detalle of updateFacturaDto.detalles) {
      const creado = await this.detallesFacturaService.create({
        ...detalle,
        facturaId: id,
      });
      nuevosDetalles.push(creado);
    }

    let total = 0;
    for (const detalle of nuevosDetalles) {
      total += detalle.subtotal;
    }

    const facturaActualizada = await this.prismaService.factura.update({
      where: { id },
      data: { total },
      include: { detallesFactura: true },
    });

    return facturaActualizada;
  }

  async remove(id: number) {
    const detalles = await this.prismaService.detallesFactura.findMany({
      where: { facturaId: id, eliminado: false },
    });

    for (const detalle of detalles) {
      await this.detallesFacturaService.remove(detalle.id);
    }

    const factura = await this.prismaService.factura.update({
      where: { id },
      data: { disponible: false },
    });

    return factura;
  }
}
