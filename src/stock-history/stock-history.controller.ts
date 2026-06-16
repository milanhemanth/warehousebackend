import { Controller, Get } from '@nestjs/common';

import { StockHistoryService } from './stock-history.service';

@Controller('stock-history')
export class StockHistoryController {
  constructor(
    private readonly stockHistoryService: StockHistoryService,
  ) {}

  @Get()
  findAll() {
    return this.stockHistoryService.findAll();
  }
}