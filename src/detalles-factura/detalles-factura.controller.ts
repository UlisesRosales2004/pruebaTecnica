/* import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DetallesFacturaService } from './detalles-factura.service';
import { CreateDetallesFacturaDto } from './dto/create-detalles-factura.dto';
import { UpdateDetallesFacturaDto } from './dto/update-detalles-factura.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('detalles-factura')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class DetallesFacturaController {
  constructor(private readonly detallesFacturaService: DetallesFacturaService) {}

  @Post()
  create(@Body() createDetallesFacturaDto: CreateDetallesFacturaDto) {
    return this.detallesFacturaService.create(createDetallesFacturaDto);
  }

  @Get()
  findAll() {
    return this.detallesFacturaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.detallesFacturaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDetallesFacturaDto: UpdateDetallesFacturaDto) {
    return this.detallesFacturaService.update(id, updateDetallesFacturaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.detallesFacturaService.remove(id);
  }
}
 */