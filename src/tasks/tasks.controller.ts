import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from 'src/dto/create-task-dto';
import { GetTaskbyIdDto } from 'src/dto/gettask-byid-dto';
import { UpdatestatusById } from 'src/dto/update-statusbyid';
import { TASKSTATUS } from '../tasks/task.model';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskservices: TasksService) {}
  @Get()
  getAlltasks(): Task[] {
    return this.taskservices.getAlltasks();
  }
  @Get('/:id')
  getTaskbyId(@Param() gettaskbyiddto: GetTaskbyIdDto): Task {
    return this.taskservices.getTaskbyId(gettaskbyiddto);
  }
  @Delete('/:id')
  deleteTaskById(@Param() gettaskbyiddto: GetTaskbyIdDto) {
    return this.taskservices.deleteTaskById(gettaskbyiddto);
  }
  @Patch('/:id/status')
  updatestatusById(
    @Param() updatestatusById: UpdatestatusById,
    @Body('status') status: TASKSTATUS,
  ) {
    return this.taskservices.updateStatusById(updatestatusById, status);
  }

  @Post()
  createTasks(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskservices.createTasks(createTaskDto);
  }
}
