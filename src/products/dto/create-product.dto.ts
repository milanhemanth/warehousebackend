import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsUUID,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @Type(() => Number)
  @IsNumber()
  quantity!: number;

  @Type(() => Number)
  @IsNumber()
  price!: number;

  @IsUUID()
  categoryId!: string;

  @IsString()
  imageUrl!: string;
}