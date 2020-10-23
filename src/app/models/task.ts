export enum Priority {
  low = 1,
  medium = 2,
  high = 3
}

export interface Task {
  taskName: string;
  priority: Priority;
  done: boolean;
}
