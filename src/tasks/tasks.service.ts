import { Injectable } from '@nestjs/common';
import { Task, TASKSTATUS } from './task.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from 'src/dto/create-task-dto';
import { GetTaskbyIdDto } from 'src/dto/gettask-byid-dto';
import { UpdatestatusById } from 'src/dto/update-statusbyid';
import { GetTaskFilterDto } from 'src/dto/get-task-filter-dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAlltasks(): Task[] {
    return this.tasks;
  }
  gettaskwithfilter(filterdto: GetTaskFilterDto): Task[] {
    const { status, search } = filterdto;
    let tasks = this.tasks;
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.description.includes(search) || task.title.includes(search),
      );
    }

    return tasks;
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
