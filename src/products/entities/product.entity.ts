import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { Category } from '../../categories/category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  quantity!: number;

  @Column('decimal')
  price!: number;

  @ManyToOne(
    () => Category,
    (category) => category.products,
  )
  category!: Category;
}