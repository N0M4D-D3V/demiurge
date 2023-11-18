import { Component, Input } from '@angular/core';
import { CardConfig } from './card.interface';

@Component({
  selector: 'demi-card',
  templateUrl: './card.component.html',
  styleUrls: [],
})
export class DemiCardComponent {
  @Input() config!: CardConfig;

  constructor() {}

  public onCardTouched(): void {
    this.config.onCardTouched();
  }
}
