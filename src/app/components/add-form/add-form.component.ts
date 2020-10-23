import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Priority, Task} from '../../models/task';
import {faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

  @Output() newTask = new EventEmitter<Task>();
  @Output() closeForm = new EventEmitter();

  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;

  constructor() {}

  ngOnInit(): void {}

  onSubmitForm(form: NgForm): void {
    const newTask: Task = {
      taskName: form.value.taskName,
      priority: Priority[Priority[form.value.priority]],
      done: false
    };

    this.newTask.emit(newTask);
  }

  onCloseForm(): void {
    this.closeForm.emit();
  }

}
