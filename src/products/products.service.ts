import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities/product.entity';
import { Category } from '../categories/category.entity';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
  ) {
    console.log(
      'SERVICE DTO:',
      createProductDto,
    );

    const category =
      await this.categoryRepository.findOne({
        where: {
          id: createProductDto.categoryId,
        },
      });

    console.log(
      'CATEGORY FOUND:',
      category,
    );

    if (!category) {
      throw new Error('Category not found');
    }

    const product =
      this.productRepository.create({
        name: createProductDto.name,
        description:
          createProductDto.description,
        quantity:
          createProductDto.quantity,
        price: createProductDto.price,
        category,
      });

    return await this.productRepository.save(
      product,
    );
  }

  async findAll() {
    return await this.productRepository.find({
      relations: {
        category: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.productRepository.findOne({
      where: { id },
      relations: {
        category: true,
      },
    });
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ) {
    let category: Category | undefined;

    if (updateProductDto.categoryId) {
      const foundCategory =
        await this.categoryRepository.findOne({
          where: {
            id: updateProductDto.categoryId,
          },
        });

      if (foundCategory) {
        category = foundCategory;
      }
    }

    await this.productRepository.update(id, {
      name: updateProductDto.name,
      description:
        updateProductDto.description,
      quantity:
        updateProductDto.quantity,
      price: updateProductDto.price,
      category,
    });

    return this.findOne(id);
  }

  async remove(id: string) {
    return await this.productRepository.delete(
      id,
    );
  }
}