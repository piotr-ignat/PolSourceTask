import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { PriorityPipe } from './pipes/priority.pipe';
import {FormsModule} from '@angular/forms';
import { AddFormComponent } from './components/add-form/add-form.component';
import { TaskComponent } from './components/task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    PriorityPipe,
    AddFormComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
