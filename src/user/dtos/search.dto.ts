import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchDto {
  @ApiProperty({
    example: 'john',
    description: 'Search term for filtering users',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Search must be a string' })
  search: string;

  @ApiProperty({
    example: 'createdAt',
    description: 'Field to sort by',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Sort by must be a string' })
  sortBy: string;

  @ApiProperty({
    example: 'desc',
    description: 'Sort order (asc or desc)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Sort order must be a string' })
  sortOrder: string;

  @ApiProperty({
    example: '10',
    description: 'Number of items per page',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Items per page must be a string' })
  itemPerPage: string;

  @ApiProperty({
    example: 1,
    description: 'Page number',
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Page must be a number' })
  page: number;
}