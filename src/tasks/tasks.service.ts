import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Task } from './task.entity';
// import * as uuid from 'uuid';
import { CreateTaskDto } from 'src/dto/create-task-dto';
// import { GetTaskbyIdDto } from 'src/dto/gettask-byid-dto';
// import { UpdatestatusById } from 'src/dto/update-statusbyid';
// import { GetTaskFilterDto } from 'src/dto/get-task-filter-dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './task.repository';
import { from, Observable } from 'rxjs';
import { TASKSTATUS } from './task-status.enum';
import { finished } from 'stream';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}
  // getAlltasks(): Observable<Task[]> {
  //   return from(this.TaskRepository.find());
  // }
  // gettaskwithfilter(filterdto: GetTaskFilterDto): Task[] {
  //   const { status, search } = filterdto;
  //   let tasks = this.tasks;
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.description.includes(search) || task.title.includes(search),
  //     );
  //   }
  //   return tasks;
  // }
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
  // deleteTaskById(gettaskbyiddto: GetTaskbyIdDto) {
  //   const { id } = gettaskbyiddto;
  //   const index = this.tasks.findIndex((key) => key.id === id);
  //   this.tasks.splice(index, 1);
  //   return 'The task has deleted sucessfully';
  // }
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
      task.descripton = description;
      task.status = TASKSTATUS.OPEN;
      await task.save();
      return task;
    }
  }
}
