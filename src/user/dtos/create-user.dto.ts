import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEmail,
  IsString,
  MinLength,
} from 'class-validator';
import { gender, Role, Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address of the user',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password (min 5 characters)',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(5, { message: 'Password must be at least 5 characters long' })
  password: string;

  @ApiProperty({
    example: 'John',
    description: 'User first name',
  })
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'User last name',
  })
  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;

  @ApiProperty({
    enum: gender,
    example: 'MALE',
    description: 'User gender',
  })
  @IsEnum(gender, { message: 'Invalid gender value' })
  @IsNotEmpty({ message: 'Gender is required' })
  gender: gender;

  @ApiProperty({
    example: '1234567890',
    description: 'User phone number',
    required: false,
  })
  @IsOptional()
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'Phone must be a valid number' },
  )
  phone: string;

  @ApiProperty({
    enum: Status,
    example: 'ACTIVE',
    description: 'User account status',
    required: false,
  })
  @IsOptional()
  @IsEnum(Status, { message: 'Invalid status value' })
  status: Status;

  @ApiProperty({
    enum: Role,
    example: 'USER',
    description: 'User role in the system',
    required: false,
  })
  @IsOptional()
  @IsEnum(Role, { message: 'Invalid role value' })
  role: Role;
}