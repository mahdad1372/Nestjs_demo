import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
// import { stat } from 'fs';
import { CreateTaskDto } from 'src/dto/create-task-dto';
// import { GetTaskFilterDto } from 'src/dto/get-task-filter-dto';
// import { GetTaskbyIdDto } from 'src/dto/gettask-byid-dto';
// import { UpdatestatusById } from 'src/dto/update-statusbyid';
// import { TaskStatusValidationPipes } from 'src/pipes/tasks-status-validation.pipes';
// import { TASKSTATUS } from '../tasks/task.model';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskservices: TasksService) {}
  // @Get()
  // getTask(@Query() taskfilterdto: GetTaskFilterDto): Task[] {
  //   if (Object.keys(taskfilterdto).length) {
  //     return this.taskservices.gettaskwithfilter(taskfilterdto);
  //   } else {
  //     return this.taskservices.getAlltasks();
  //   }
  // }
  @Get('/:id')
  getTaskbyId(@Param('id', ParseIntPipe) id: number) {
    return this.taskservices.getTaskbyId(id);
  }
  // @Delete('/:id')
  // deleteTaskById(@Param() gettaskbyiddto: GetTaskbyIdDto) {
  //   return this.taskservices.deleteTaskById(gettaskbyiddto);
  // }
  // @Patch('/:id/status')
  // updatestatusById(
  //   @Param() updatestatusById: UpdatestatusById,
  //   @Body('status', TaskStatusValidationPipes) status: TASKSTATUS,
  // ) {
  //   return this.taskservices.updateStatusById(updatestatusById, status);
  // }

  @Post()
  @UsePipes(ValidationPipe)
  async createTasks(@Body() createTaskDto: CreateTaskDto) {
    return this.taskservices.createTasks(createTaskDto);
  }
}
