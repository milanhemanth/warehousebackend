import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common';;

import { CategoriesService } from './categories.service';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
  ) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.create(
      createCategoryDto.name,
    );
  }

  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }
  @Put(':id')
async update(
  @Param('id') id: string,
  @Body() createCategoryDto: CreateCategoryDto,
) {
  return this.categoriesService.update(
    id,
    createCategoryDto.name,
  );
}

@Delete(':id')
async remove(
  @Param('id') id: string,
) {
  return this.categoriesService.remove(id);
}
}