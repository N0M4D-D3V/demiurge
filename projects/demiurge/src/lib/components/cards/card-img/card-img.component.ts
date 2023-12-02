import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DemiCardConfig } from '../card/card.interface';

@Component({
  selector: 'demi-card-img',
  template: `
    @defer (on viewport) {
    <div class="card text-bg-dark fadein" (click)="cardTouched()">
      <img src="{{ config.imgUrl }}" class="card-img" alt="novel cover" />
      <div class="card-img-overlay">
        <h5 class="card-title">{{ config.title }}</h5>
        <p class="card-text">{{ config.description }}</p>
        <a (click)="readTouched()" class="btn btn-play"
          ><i class="bi bi-eyeglasses"></i
        ></a>
      </div>
    </div>
    } @placeholder {
    <div class="card text-bg-dark fadein">
      <img src="" class="card-img" alt="novel cover" />
      <div class="card-img-overlay">
        <h5 class="card-title"></h5>
        <p class="card-text"></p>
        <a class="btn btn-play"><i class="bi bi-eyeglasses"></i></a>
      </div>
    </div>
    }
  `,
  styleUrls: ['./card-img.component.scss'],
  standalone: true,
})
export class DemiCardImgComponent<T = any> {
  @Input() config!: DemiCardConfig<T>;

  @Output() onReadTouched: EventEmitter<DemiCardConfig<T>> = new EventEmitter();
  @Output() onCardTouched: EventEmitter<DemiCardConfig<T>> = new EventEmitter();

  constructor() {}

  public cardTouched(): void {
    if (this.config.isClickable) this.onCardTouched.emit(this.config);
  }

  public readTouched(): void {
    this.onReadTouched.emit(this.config);
  }
}
