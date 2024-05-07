import { DatePipe } from '@angular/common';
import { Component, Injectable } from '@angular/core';

@Component({
  selector: 'app-clock',
  standalone: true,
  template: `{{ formattedDate }}`,
  imports: [DatePipe],
  providers: [DatePipe],
})
@Injectable({
  providedIn: 'root',
})
export class clockComponent {
  public formattedDate: string | null = '';

  // Interval for show date in real time
  constructor(private datePipe: DatePipe) {
    this.updateFormattedDate();
    setInterval(() => {
      this.updateFormattedDate();
    }, 1000);
  }

  // Format for date
  private updateFormattedDate() {
    const now = new Date();
    this.formattedDate = this.datePipe.transform(now, 'medium', 'es');
  }
}
