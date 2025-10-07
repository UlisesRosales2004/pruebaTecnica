import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { RegisterDto } from './dto/register.dto';
import bcrypt from 'node_modules/bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,

  ) {}

  async register({ email, password, nombreCompleto }: RegisterDto) {
    const user = await this.usuarioService.findOneByEmail(email);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    await this.usuarioService.create({
      email,
      password: await bcrypt.hash(password, 10),
      nombreCompleto,
    });
    return { email };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usuarioService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('email is wrong');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('password is wrong');
    }
    const payload = { email: user.email };
    const token = await this.jwtService.signAsync(payload);
    return {
      token,
      email,
    };
  }
}
