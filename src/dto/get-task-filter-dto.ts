import { TASKSTATUS } from 'src/tasks/task-status.enum';

export class GetTaskFilterDto {
  status: TASKSTATUS;
  search: string;
}
