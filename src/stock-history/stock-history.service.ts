import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StockHistory } from './stock-history.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class StockHistoryService {
  constructor(
    @InjectRepository(StockHistory)
    private stockHistoryRepository: Repository<StockHistory>,
  ) {}

  async create(
    product: Product,
    action: string,
    quantity: number,
  ) {
    const history =
      this.stockHistoryRepository.create({
        product,
        action,
        quantity,
      });

    return this.stockHistoryRepository.save(
      history,
    );
  }

  async findAll() {
    return this.stockHistoryRepository.find({
      relations: {
        product: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}