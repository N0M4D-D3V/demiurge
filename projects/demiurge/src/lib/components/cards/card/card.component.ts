import { Component, Input } from '@angular/core';
import { DemiCardConfig } from './card.interface';

@Component({
    selector: 'demi-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    standalone: true,
})
export class DemiCardComponent {
  @Input() config!: DemiCardConfig;

  constructor() {}

  public onCardTouched(): void {
    this.config.onCardTouched();
  }
}
