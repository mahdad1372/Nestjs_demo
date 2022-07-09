import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TASKSTATUS } from '../tasks/task-status.enum';
export class TaskStatusValidationPipes implements PipeTransform {
  readonly allowedStatus = [
    TASKSTATUS.OPEN,
    TASKSTATUS.IN_PROGRESS,
    TASKSTATUS.DONE,
  ];
  transform(value: any) {
    if (!this.allowedStatus.includes(value)) {
      throw new BadRequestException(`Sorry this ${value} is not valid`);
    } else {
      return value;
    }
  }
}
