import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DemiCardConfig, DemiCardItem } from '../../interfaces/card.interface';

@Component({
  selector: 'demi-card-img',
  template: `
    @if(item){ @defer (on viewport) {
    <div class="card text-bg-dark fadein" (click)="cardTouched()">
      <img src="{{ item.imgUrl }}" class="card-img" alt="novel cover" />
      <div class="card-img-overlay">
        <h5 class="card-title">{{ item.title }}</h5>
        <p class="card-text">{{ item.subtitle }}</p>

        <div class="card-footer d-flex align-items-center">
          <span>{{ item.bottomText }}</span>
          <a (click)="readTouched()" class="btn btn-play ms-auto"
            ><i class="bi bi-eyeglasses"></i
          ></a>
        </div>
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
    } }
  `,
  styleUrls: ['./card-img.component.scss'],
  standalone: true,
})
export class DemiCardImgComponent<T extends DemiCardItem> {
  @Input() config!: DemiCardConfig | undefined;
  @Input() item!: T;

  @Output() onReadTouched: EventEmitter<T> = new EventEmitter();
  @Output() onCardTouched: EventEmitter<T> = new EventEmitter();

  constructor() {}

  public cardTouched(): void {
    if (this.config?.isClickable) this.onCardTouched.emit(this.item);
  }

  public readTouched(): void {
    this.onReadTouched.emit(this.item);
  }
}
