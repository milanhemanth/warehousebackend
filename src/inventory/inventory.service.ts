import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Inventory } from './inventory.entity';
import { Product } from '../products/entities/product.entity';

import { StockInDto } from './dto/stock-in.dto';
import { StockOutDto } from './dto/stock-out.dto';

import { StockHistoryService } from '../stock-history/stock-history.service';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    private stockHistoryService: StockHistoryService,
  ) {}

  async findAll() {
    return this.productRepository.find({
      relations: {
        category: true,
      },
    });
  }

  async stockIn(stockInDto: StockInDto) {
    const product =
      await this.productRepository.findOne({
        where: {
          id: stockInDto.productId,
        },
      });

    if (!product) {
      throw new BadRequestException(
        'Product not found',
      );
    }

    product.quantity += stockInDto.quantity;

    const updatedProduct =
      await this.productRepository.save(
        product,
      );

    await this.stockHistoryService.create(
      product,
      'STOCK_IN',
      stockInDto.quantity,
    );

    return updatedProduct;
  }

  async stockOut(stockOutDto: StockOutDto) {
    const product =
      await this.productRepository.findOne({
        where: {
          id: stockOutDto.productId,
        },
      });

    if (!product) {
      throw new BadRequestException(
        'Product not found',
      );
    }

    if (
      product.quantity <
      stockOutDto.quantity
    ) {
      throw new BadRequestException(
        'Not enough stock available',
      );
    }

    product.quantity -= stockOutDto.quantity;

    const updatedProduct =
      await this.productRepository.save(
        product,
      );

    await this.stockHistoryService.create(
      product,
      'STOCK_OUT',
      stockOutDto.quantity,
    );

    return updatedProduct;
  }
}