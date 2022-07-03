import { TASKSTATUS } from 'src/tasks/task.model';

export class GetTaskFilterDto {
  status: TASKSTATUS;
  search: string;
}
