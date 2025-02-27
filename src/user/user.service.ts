import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService, QueryMode } from 'src/database/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ListUserSearchDto } from './dtos/list-user-search.dto';
import { SearchDto } from './dtos/search.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private PrismaService: PrismaService) {}

  async createUser(userData: CreateUserDto): Promise<User> {
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
  async listUser(data: SearchDto): Promise<ListUserSearchDto> {
    const search = data.search || '';
    const page = Math.max(1, Number(data.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(data.itemPerPage) || 10));
    const sortBy = data.sortBy || 'createdAt';
    const sortOrder = data.sortOrder === 'asc' ? 'asc' : 'desc';

    // Define where condition once to avoid duplication
    const whereCondition = {
      OR: [
        { email: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } },
      ],
    };

    // Get users with pagination
    const users = await this.PrismaService.user.findMany({
      where: whereCondition,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    // Get total count
    const total = await this.PrismaService.user.count({
      where: whereCondition,
    });

    const totalPages = Math.ceil(total / limit);

    // Return result with totalPages included
    const result: ListUserSearchDto = {
      users,
      page,
      limit,
      skip: (page - 1) * limit,
      total,
      totalPages, // Add this field to the result
      search,
      sortBy,
      sortOrder,
      itemPerPage: String(limit),
    };

    return result;
  }
}
