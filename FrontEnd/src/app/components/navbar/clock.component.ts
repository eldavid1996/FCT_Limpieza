import { DatePipe } from '@angular/common';
import { Component, Injectable } from '@angular/core';
@Component({
  selector: 'app-clock',
  standalone: true,
  template: `{{ now | date : 'medium' }}`,
  imports: [DatePipe],
})
@Injectable()
export class clockComponent {
  public now: Date = new Date();

  constructor() {
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }
}
