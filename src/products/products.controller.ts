import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { ProductsService } from './products.service';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  @Post()
  @Roles('Admin', 'Manager')
  create(
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(
      createProductDto,
    );
  }

  @Get()
  @Roles('Admin', 'Manager')
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @Roles('Admin', 'Manager')
  findOne(
    @Param('id') id: string,
  ) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @Roles('Admin', 'Manager')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(
      id,
      updateProductDto,
    );
  }

  @Delete(':id')
  @Roles('Admin')
  remove(
    @Param('id') id: string,
  ) {
    return this.productsService.remove(id);
  }
}