import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@core/utils/base.entity';

@Entity()
export class Task extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;
}
