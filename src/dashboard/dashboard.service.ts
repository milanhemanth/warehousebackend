import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';

import { Product } from '../products/entities/product.entity';
import { Category } from '../categories/category.entity';
import { User } from '../users/user.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getDashboardData() {
    const totalProducts =
      await this.productRepository.count();

    const totalCategories =
      await this.categoryRepository.count();

    const totalUsers =
      await this.userRepository.count();

    const lowStockItems =
      await this.productRepository.count({
        where: {
          quantity: LessThan(10),
        },
      });

    return {
      totalProducts,
      totalCategories,
      totalUsers,
      lowStockItems,
    };
  }
}