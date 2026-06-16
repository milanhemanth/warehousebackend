import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';

import { InventoryService } from './inventory.service';

import { StockInDto } from './dto/stock-in.dto';
import { StockOutDto } from './dto/stock-out.dto';

@Controller('inventory')
export class InventoryController {
  constructor(
    private readonly inventoryService: InventoryService,
  ) {}

  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }

  @Post('stock-in')
  stockIn(
    @Body() stockInDto: StockInDto,
  ) {
    console.log(
      'STOCK IN BODY:',
      stockInDto,
    );

    return this.inventoryService.stockIn(
      stockInDto,
    );
  }

  @Post('stock-out')
  stockOut(
    @Body() stockOutDto: StockOutDto,
  ) {
    console.log(
      'STOCK OUT BODY:',
      stockOutDto,
    );

    return this.inventoryService.stockOut(
      stockOutDto,
    );
  }
}