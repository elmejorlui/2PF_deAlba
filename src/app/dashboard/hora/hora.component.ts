import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeService, Time } from '../../core/services/time.services';

@Component({
  selector: 'app-hora',
  templateUrl: './hora.component.html',
  styleUrls: ['./hora.component.scss']
})
export class HoraComponent {
  horaActual$: Observable<string>;

  constructor(private timeService: TimeService) {
    this.horaActual$ = this.timeService.reloj;
  }
}
