import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DemiCardConfig, DemiCardItem } from '../../interfaces/card.interface';

@Component({
  selector: 'demi-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
})
export class DemiCardComponent<T extends DemiCardItem> {
  @Input() config!: DemiCardConfig;
  @Input() item!: T;

  @Output() onCardTouched: EventEmitter<T> = new EventEmitter();

  constructor() {}

  public cardTouched(): void {
    this.onCardTouched.emit(this.item);
  }
}
