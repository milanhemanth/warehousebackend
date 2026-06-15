import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(name: string) {
    const category = this.categoryRepository.create({
      name,
    });

    return await this.categoryRepository.save(
      category,
    );
  }

  async findAll() {
    return await this.categoryRepository.find();
  }
  async update(id: string, name: string) {
  await this.categoryRepository.update(id, {
    name,
  });

  return await this.categoryRepository.findOne({
    where: { id },
  });
}

async remove(id: string) {
  await this.categoryRepository.delete(id);

  return {
    message: 'Category deleted successfully',
  };
}
}