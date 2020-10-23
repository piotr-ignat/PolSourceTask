import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../models/task';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  faTrashAlt = faTrashAlt;

  @Input() task: Task;

  @Output() deleteTask = new EventEmitter<Task>();
  @Output() isChecked = new EventEmitter<{task: Task, checked: boolean}>();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(task: Task): void {
    this.deleteTask.emit(task);
  }

  onCheck(task: Task, checkbox): void {
    this.isChecked.emit({task, checked: checkbox.checked});
  }

}
