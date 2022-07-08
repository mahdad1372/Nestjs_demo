import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
// import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {}
