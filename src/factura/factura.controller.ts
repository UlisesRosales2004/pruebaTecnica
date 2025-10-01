import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('factura')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) {}

  @Post()
  async create(@Body() createFacturaDto: CreateFacturaDto) {
    return await this.facturaService.create(createFacturaDto);
  }

  @Get()
  async findAll() {
    return await this.facturaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.facturaService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateFacturaDto: UpdateFacturaDto) {
    return await this.facturaService.update(id, updateFacturaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.facturaService.remove(id);
  }
}
