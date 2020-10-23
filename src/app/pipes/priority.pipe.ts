import { Pipe, PipeTransform } from '@angular/core';
import {Priority} from '../models/task';

@Pipe({
  name: 'priority'
})
export class PriorityPipe implements PipeTransform {

  transform(value: Priority): string {
    switch (value) {
      case 1:
        return 'low';
      case 2:
        return 'medium';
      case 3:
        return 'high';
    }
  }

}
