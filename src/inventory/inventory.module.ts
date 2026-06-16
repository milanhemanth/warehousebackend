import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';

import { Inventory } from './inventory.entity';
import { Product } from '../products/entities/product.entity';

import { StockHistoryModule } from '../stock-history/stock-history.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Inventory,
      Product,
    ]),
    StockHistoryModule,
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}