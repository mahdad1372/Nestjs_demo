export interface Task {
  id: string;
  title: string;
  description: string;
  status: TASKSTATUS;
}

export enum TASKSTATUS {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
