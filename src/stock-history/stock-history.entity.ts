import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { Product } from '../products/entities/product.entity';

@Entity('stock_history')
export class StockHistory {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Product)
  product!: Product;

  @Column()
  action!: string;

  @Column()
  quantity!: number;

  @CreateDateColumn()
  createdAt!: Date;
}