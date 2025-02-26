import { Body, Controller, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dtos/auth.dto';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: RegisterUserDto): Promise<User> {
    return this.authService.register(userData);
  }

  @Post('login')
  async login(@Body() userData: LoginUserDto): Promise<any> {
    return this.authService.login(userData);
  }
}
