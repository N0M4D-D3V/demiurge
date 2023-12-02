import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DemiCardConfig } from './card.interface';

@Component({
  selector: 'demi-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
})
export class DemiCardComponent<T = any> {
  @Input() config!: DemiCardConfig<T>;

  @Output() onCardTouched: EventEmitter<DemiCardConfig> = new EventEmitter();

  constructor() {}

  public cardTouched(): void {
    this.onCardTouched.emit(this.config);
  }
}
