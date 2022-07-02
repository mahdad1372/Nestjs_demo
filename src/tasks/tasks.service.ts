import { Injectable } from '@nestjs/common';
import { Task, TASKSTATUS } from './task.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from 'src/dto/create-task-dto';
import { GetTaskbyIdDto } from 'src/dto/gettask-byid-dto';
import { UpdatestatusById } from 'src/dto/update-statusbyid';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAlltasks(): Task[] {
    return this.tasks;
  }
  getTaskbyId(gettaskbyiddto: GetTaskbyIdDto): Task {
    const { id } = gettaskbyiddto;
    return this.tasks.find((task) => task.id === id);
  }
  deleteTaskById(gettaskbyiddto: GetTaskbyIdDto) {
    const { id } = gettaskbyiddto;
    const index = this.tasks.findIndex((key) => key.id === id);
    this.tasks.splice(index, 1);
    return 'The task has deleted sucessfully';
  }
  updateStatusById(updatestatusById: UpdatestatusById, status: TASKSTATUS) {
    const { id } = updatestatusById;
    const task = this.tasks.find((task) => task.id === id);
    task.status = status;
    return task;
  }
  createTasks(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid.v4(),
      title,
      description,
      status: TASKSTATUS.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
