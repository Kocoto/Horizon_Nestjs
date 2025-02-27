import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { createUserDto, listUserSearchDto, searchDto } from './dtos/user.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private PrismaService: PrismaService) {}

  async createUser(userData: createUserDto): Promise<User> {
    const checkEmail = await this.PrismaService.user.findUnique({
      where: { email: userData.email },
    });

    if (checkEmail) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const passwordHashed = await bcrypt.hash(userData.password, 10);

    const user = await this.PrismaService.user.create({
      data: {
        ...userData,
        password: passwordHashed,
      },
    });
    return user;
  }
  async listUser(data: searchDto): Promise<listUserSearchDto> {
    const search = data.search || '';
    const page = Math.max(1, Number(data.page) || 1); // Ensure minimum page is 1
    const limit = Math.min(100, Math.max(1, Number(data.itemPerPage) || 10)); // Limit between 1-100
    const sortBy = data.sortBy || 'createdAt';
    const sortOrder = data.sortOrder === 'asc' ? 'asc' : 'desc';
    const users = await this.PrismaService.user.findMany({
      where: {
        OR: [
          {
            email: {
              contains: search,
            },
          },
          {
            lastName: {
              contains: search,
            },
          },
          {
            firstName: {
              contains: search,
            },
          },
        ],
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    const total = await this.PrismaService.user.count({
      where: {
        OR: [
          {
            email: {
              contains: search,
            },
          },
          {
            lastName: {
              contains: search,
            },
          },
          {
            firstName: {
              contains: search,
            },
          },
        ],
      },
    });

    const totalPages = Math.ceil(total / limit);

    const result: listUserSearchDto = {
      users,
      page,
      limit,
      skip: (page - 1) * limit,
      total,
    };
  }
}
