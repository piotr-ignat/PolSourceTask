import { Injectable } from '@angular/core';
import {Task} from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private _tasks: Task[];

  get tasks(): Task[] {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) { this._tasks = tasks; }
    else { this._tasks = []; }
    return this._tasks.slice();
  }

  constructor() { }

  getTasks(): Task[] {
    return this._tasks.slice();
  }

  addNewTask(newTask: Task): Task[] {
    this._tasks.unshift(newTask);
    localStorage.setItem('tasks', JSON.stringify(this._tasks));
    return this._tasks.slice();
  }

  deleteTask(task: Task): Task[] {
    this._tasks.splice(this._tasks.indexOf(task), 1);
    localStorage.setItem('tasks', JSON.stringify(this._tasks));
    return this._tasks.slice();
  }

  updateTaskStatus(updatedTask: {task: Task, checked: boolean}): void {
    this._tasks[this._tasks.indexOf(updatedTask.task)].done = updatedTask.checked;
    localStorage.setItem('tasks', JSON.stringify(this._tasks));
  }

  sortColumn(column: string, isAscend: boolean): boolean {
    if (!isAscend) {
      this._tasks.sort((a, b) => {
        if (a[column] < b[column]) {
          return -1;
        }
        if (a[column] > b[column]) {
          return 1;
        }
        return 0;
      });
      return true;
    }
    else {
      this._tasks.sort((a, b) => {
        if (a[column] > b[column]) {
          return -1;
        }
        if (a[column] < b[column]) {
          return 1;
        }
        return 0;
      });
      return false;
    }
  }
}
