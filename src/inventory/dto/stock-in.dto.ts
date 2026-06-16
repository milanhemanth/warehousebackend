import {
  IsUUID,
  IsNumber,
} from 'class-validator';

export class StockInDto {
  @IsUUID()
  productId!: string;

  @IsNumber()
  quantity!: number;
}