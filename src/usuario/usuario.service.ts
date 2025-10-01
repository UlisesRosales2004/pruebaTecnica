import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsuarioService {

  constructor(private readonly prismaService: PrismaService) {}
  async create(createUsuarioDto: CreateUsuarioDto) {
    return await this.prismaService.usuario.create({
      data: createUsuarioDto,
    });
  }

  async findOneByEmail(email: string) {
    return await this.prismaService.usuario.findUnique({
      where: { email },
    });
  }

  async findAll() {
    return await this.prismaService.usuario.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.usuario.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return await this.prismaService.usuario.update({
      where: { id },
      data: updateUsuarioDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.usuario.update({
      where: { id },
      data: { eliminado: true }
    });
  }
}
