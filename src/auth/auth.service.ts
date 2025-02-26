import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { LoginUserDto, RegisterUserDto } from './dtos/auth.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { first } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private PrismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(userData: RegisterUserDto): Promise<any> {
    const checkUser = await this.PrismaService.user.findUnique({
      where: { email: userData.email },
    });
    if (checkUser) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.PrismaService.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });
    return user;
  }

  async login(userData: LoginUserDto): Promise<any> {
    const user = await this.PrismaService.user.findUnique({
      where: { email: userData.email },
    });
    if (!user) {
      throw new HttpException('User is not exits', HttpStatus.UNAUTHORIZED);
    }
    const isPasswordValid = await bcrypt.compare(
      userData.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    const payload = {
      email: user.email,
      id: user.id,
      role: user.role,
      status: user.status,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: '1H',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '1D',
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
