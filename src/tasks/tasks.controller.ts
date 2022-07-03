import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { stat } from 'fs';
import { CreateTaskDto } from 'src/dto/create-task-dto';
import { GetTaskFilterDto } from 'src/dto/get-task-filter-dto';
import { GetTaskbyIdDto } from 'src/dto/gettask-byid-dto';
import { UpdatestatusById } from 'src/dto/update-statusbyid';
import { TASKSTATUS } from '../tasks/task.model';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskservices: TasksService) {}
  @Get()
  getTask(@Query() taskfilterdto: GetTaskFilterDto): Task[] {
    if (Object.keys(taskfilterdto).length) {
      return this.taskservices.gettaskwithfilter(taskfilterdto);
    } else {
      return this.taskservices.getAlltasks();
    }
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
  @UsePipes(ValidationPipe)
  createTasks(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskservices.createTasks(createTaskDto);
  }
}
