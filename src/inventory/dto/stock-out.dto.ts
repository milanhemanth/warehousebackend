import {
  IsUUID,
  IsNumber,
} from 'class-validator';

export class StockOutDto {
  @IsUUID()
  productId!: string;

  @IsNumber()
  quantity!: number;
}