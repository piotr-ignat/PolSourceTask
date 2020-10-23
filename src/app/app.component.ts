import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Task} from './models/task';
import {faPlusCircle, faSortDown, faSortUp, faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {AppService} from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  // tasks
  public tasks: Task[];
  public taskDisplayed: Task[];

  // icons
  faSortUp = faSortUp;
  faSortDown = faSortDown;
  faPlusCircle = faPlusCircle;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  // sorting
  doneAscend: boolean;
  priorityAscend: boolean;
  nameAscend: boolean;

  // paging
  @ViewChild('rowsCount') rowsCount: ElementRef;
  page: number;
  pages: number;
  rows: number;
  start: number;
  end: number;

  // form
  addMode: boolean;

  constructor(private appService: AppService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.tasks = this.appService.tasks;
    this.page = 1;
    this.addMode = false;
  }

  ngAfterViewInit(): void {
    this.rows = this.rowsCount.nativeElement.value;
    this.updateTableView(this.rows);
    this.cdRef.detectChanges();
  }

  onAddNewTask(newTask: Task): void {
    this.tasks = this.appService.addNewTask(newTask);
    this.onCloseForm();
    this.updateTableView(this.rows);
  }

  onDeleteTask(task: Task): void {
    this.tasks = this.appService.deleteTask(task);
    this.updateTableView(this.rows);
  }

  onCheck(task: {task: Task, checked: boolean}): void {
    this.appService.updateTaskStatus(task);
  }

  onSort(column: string): void {
    switch (column) {
      case 'taskName':
        this.doneAscend = undefined;
        this.priorityAscend = undefined;
        this.nameAscend = this.appService.sortColumn(column, this.nameAscend);
        break;
      case 'priority' :
        this.nameAscend = undefined;
        this.doneAscend = undefined;
        this.priorityAscend = this.appService.sortColumn(column, this.priorityAscend);
        break;
      case 'done':
        this.nameAscend = undefined;
        this.priorityAscend = undefined;
        this.doneAscend = this.appService.sortColumn(column, this.doneAscend);
        break;
    }
    this.tasks = this.appService.getTasks();
    this.updateTableView(this.rows);
  }

  onAdd(): void {
    this.addMode = true;
  }

  onCloseForm(): void {
    this.addMode = false;
  }

  onCountChange(): void {
    this.rows = this.rowsCount.nativeElement.value;
    this.updateTableView(this.rows);
  }

  onPrevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.updateTableView(this.rows);
    }
  }

  onNextPage(): void {
    if (this.page < this.pages) {
      this.page++;
      this.updateTableView(this.rows);
    }
  }

  updateTableView(rowsCount: number): void {
    this.pages = Math.ceil( this.tasks.length / this.rows) < 1 ? 1 : Math.ceil( this.tasks.length / this.rows);
    if (this.page > this.pages) { this.page = this.pages; }
    this.start = (this.page - 1) * rowsCount;
    this.end = this.page * rowsCount > this.tasks.length ? this.tasks.length : this.page * rowsCount;
    this.taskDisplayed = this.tasks.slice(this.start, this.end);
  }
}
