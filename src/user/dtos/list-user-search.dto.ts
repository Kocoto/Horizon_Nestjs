import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class ListUserSearchDto {
  @ApiProperty({
    example: 'john',
    description: 'Search term used for filtering',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Search must be a string' })
  search: string;

  @ApiProperty({
    example: 'createdAt',
    description: 'Field used for sorting',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Sort by must be a string' })
  sortBy: string;

  @ApiProperty({
    example: 'desc',
    description: 'Sort order used (asc or desc)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Sort order must be a string' })
  sortOrder: string;

  @ApiProperty({
    example: '10',
    description: 'Number of items per page requested',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Items per page must be a string' })
  itemPerPage: string;

  @ApiProperty({
    example: 1,
    description: 'Current page number',
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Page must be a number' })
  page: number;

  @ApiProperty({
    example: 10,
    description: 'Number of items per page returned',
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Limit must be a number' })
  limit: number;

  @ApiProperty({
    example: 0,
    description: 'Number of items skipped',
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Skip must be a number' })
  skip: number;

  @ApiProperty({
    example: 100,
    description: 'Total number of items',
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Total must be a number' })
  total: number;

  @ApiProperty({
    type: 'array',
    items: { type: 'object', description: 'User object' },
    description: 'List of users',
  })
  users: User[];
}