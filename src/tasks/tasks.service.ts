import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Task } from './task.entity';
// import * as uuid from 'uuid';
import { CreateTaskDto } from 'src/dto/create-task-dto';
import { GetTaskbyIdDto } from 'src/dto/gettask-byid-dto';
// import { UpdatestatusById } from 'src/dto/update-statusbyid';
import { GetTaskFilterDto } from 'src/dto/get-task-filter-dto';
import { getRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './task.repository';
import { from, Observable } from 'rxjs';
import { TASKSTATUS } from './task-status.enum';
import { json } from 'stream/consumers';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}
  getAlltasks(): Promise<Task[]> {
    return this.taskRepository.find({});
  }

  async gettaskwithfilter(filterdto: GetTaskFilterDto) {
    const { status, search } = filterdto;
    const query = this.taskRepository.createQueryBuilder('task');

    if (status) {
      await query.andWhere('task.status = :status', { status });
    }
    if (search) {
      await query.andWhere(
        '(task.title LIKE :search OR task.descripton LIKE :search)',
        { search: `%${search}%` },
      );
    }
    const tasks = query.getMany();
    return await tasks;
  }
  async getTaskbyId(id: number) {
    const task = await this.taskRepository.find({
      where: { id },
    });
    if (task.length > 0) {
      return task;
    }

    throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
  }
  // async getTodoById(id: number) {
  //   const todo = await this.taskRepository.findOne(id);
  //   if (todo) {
  //     return todo;
  //   }

  //   throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
  // }
  // async getTaskbyId(id: string): Promise<Task> {
  //   // const { id } = await gettaskbyiddto;
  //   const findtask = await this.taskRepository.findOne(id);
  //   if (!findtask) {
  //     throw new NotFoundException('Sorry this task has not been found');
  //   } else {
  //     return findtask;
  //   }
  // }
  async deleteTaskById(gettaskbyiddto: GetTaskbyIdDto) {
    const { id } = gettaskbyiddto;
    const deletetask = await this.taskRepository.delete(Number(id));
    if (!deletetask.affected) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
    return new HttpException(
      'The task has deleted successfully',
      HttpStatus.OK,
    );
  }
  // updateStatusById(updatestatusById: UpdatestatusById, status: TASKSTATUS) {
  //   const { id } = updatestatusById;
  //   const task = this.tasks.find((task) => task.id === id);
  //   task.status = status;
  //   return task;
  // }
  async createTasks(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;
    const findtask = await this.taskRepository.find({
      where: { title },
    });
    if (findtask.length > 0) {
      throw new HttpException(
        'Sorry this title is repitetive',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const task = new Task();
      task.title = title;
      task.description = description;
      task.status = TASKSTATUS.OPEN;
      await task.save();
      return task;
    }
  }
}
