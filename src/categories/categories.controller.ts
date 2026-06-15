import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';

import { CategoriesService } from './categories.service';

import { CreateCategoryDto } from './dto/create-category.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
  ) {}

  @Post()
  @Roles('Admin')
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.create(
      createCategoryDto.name,
    );
  }

  @Get()
  @Roles('Admin', 'Manager')
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Put(':id')
  @Roles('Admin')
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
  @Roles('Admin')
  async remove(
    @Param('id') id: string,
  ) {
    return this.categoriesService.remove(id);
  }
}