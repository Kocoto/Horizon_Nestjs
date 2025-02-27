import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEmail,
  IsString,
  MinLength,
} from 'class-validator';
import { gender, Role, Status, User } from '@prisma/client';

export class createUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(5, { message: 'Password must be at least 5 characters long' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;

  @IsEnum(gender, { message: 'Invalid gender value' })
  @IsNotEmpty({ message: 'Gender is required' })
  gender: gender;

  @IsOptional()
  @IsNumber()
  phone: string;

  @IsOptional()
  @IsEnum(Status, { message: 'Invalid status value' })
  status: Status;

  @IsOptional()
  @IsEnum(Role, { message: 'Invalid role value' })
  role: Role;
}

export class searchDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsString()
  sortBy: string;

  @IsOptional()
  @IsString()
  sortOrder: string;

  @IsOptional()
  @IsString()
  itemPerPage: string;

  @IsOptional()
  @IsNumber()
  page: number;
}

export class listUserSearchDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsString()
  sortBy: string;

  @IsOptional()
  @IsString()
  sortOrder: string;

  @IsOptional()
  @IsString()
  itemPerPage: string;

  @IsOptional()
  @IsNumber()
  page: number;

  @IsOptional()
  @IsNumber()
  limit: number;

  @IsOptional()
  @IsNumber()
  skip: number;

  @IsOptional()
  @IsNumber()
  total: number;

  users: User[];
}
