import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DemiCardConfig } from '../card/card.interface';
import { DemiCardComponent } from '../card/card.component';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { FullSearchPipe } from '../../../pipes/search/full-search.pipe';
import { DemiToolbarService } from '../../../services/toolbar/toolbar.service';

@Component({
  selector: 'demi-card-list',
  template: `
    @if(config$ | async; as configs){
    <div class="d-flex flex-wrap justify-content-around">
      @for(conf of configs | fullsearch: searchValue; track conf.id){
      <demi-card
        [config]="conf"
        (onCardTouched)="cardTouched($event)"
      ></demi-card>
      }@empty {
      <span class="text-center w-100 mt-5 text-danger fw-bold">
        NOTHING TO SHOW <i class="bi bi-bookmarks-fill"></i>
      </span>
      }
    </div>
    }
  `,
  styleUrls: [],
  standalone: true,
  imports: [NgFor, DemiCardComponent, NgIf, AsyncPipe, FullSearchPipe],
})
export class DemiCardListComponent<T = any> implements OnInit, OnDestroy {
  private subToolbar!: Subscription;

  @Input() config$!: Observable<DemiCardConfig<T>[]>;
  @Input() canSearch: boolean = false;

  @Output() onCardTouched: EventEmitter<DemiCardConfig<T>> = new EventEmitter();

  public searchValue: string = '';

  constructor(private readonly tbService: DemiToolbarService) {}

  ngOnInit(): void {
    this.subToolbar = this.tbService
      .searchObservable()
      .subscribe((value) => (this.searchValue = value ?? ''));
  }

  public cardTouched(card: DemiCardConfig<T>): void {
    this.onCardTouched.emit(card);
  }

  ngOnDestroy(): void {
    this.subToolbar.unsubscribe();
  }
}
