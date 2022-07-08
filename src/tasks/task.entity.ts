import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TASKSTATUS } from './task-status.enum';
@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public title: string;
  @Column()
  public descripton: string;
  @Column()
  public status: TASKSTATUS;
}
