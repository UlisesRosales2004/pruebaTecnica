import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsuarioService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUsuarioDto: CreateUsuarioDto) {
    await this.prismaService.usuario.create({
      data: createUsuarioDto,
    });
    return {
      message: 'Usuario creado exitosamente',
      email: createUsuarioDto.email,
      nombreCompleto: createUsuarioDto.nombreCompleto,
    };
  }

  async findOneByEmail(email: string) {
    return await this.prismaService.usuario.findUnique({
      where: { email },
    });
  }

  async findAll() {
    return await this.prismaService.usuario.findMany({
      where: { eliminado: false },
      select: {
        id: true,
        nombreCompleto: true,
        email: true,
        fechaNacimiento: true,
        dni: true,
        sexo: true,
        estadoCivil: true,
        disponible: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.usuario.findUnique({
      where: { id, eliminado: false },
      select: {
        id: true,
        nombreCompleto: true,
        email: true,
        fechaNacimiento: true,
        dni: true,
        sexo: true,
        estadoCivil: true,
        disponible: true,
      },
    });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return await this.prismaService.usuario.update({
      where: { id },
      data: updateUsuarioDto,
      select: {
        id: true,
        nombreCompleto: true,
        email: true,
        fechaNacimiento: true,
        dni: true,
        sexo: true,
        estadoCivil: true,
        disponible: true,
      },
    });
  }

  async remove(id: number) {
    return await this.prismaService.usuario.update({
      where: { id },
      data: { eliminado: true },
      select: {
        id: true,
        nombreCompleto: true,
        email: true,
        fechaNacimiento: true,
        dni: true,
        sexo: true,
        estadoCivil: true,
        disponible: true,
      },
    });
  }
}
