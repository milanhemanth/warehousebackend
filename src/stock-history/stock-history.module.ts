import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StockHistory } from './stock-history.entity';

import { StockHistoryService } from './stock-history.service';
import { StockHistoryController } from './stock-history.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StockHistory,
    ]),
  ],
  providers: [StockHistoryService],
  controllers: [StockHistoryController],
  exports: [StockHistoryService],
})
export class StockHistoryModule {}