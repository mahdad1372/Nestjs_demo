import { IsNotEmpty } from 'class-validator';
import { Unique } from 'typeorm';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
