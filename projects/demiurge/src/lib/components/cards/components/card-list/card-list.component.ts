import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DemiCardConfig, DemiCardItem } from '../../interfaces/card.interface';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { FullSearchPipe } from '../../../../pipes/search/full-search.pipe';
import { DemiToolbarService } from '../../../../services/toolbar/toolbar.service';
import { DemiCardComponent } from '../card/card.component';

@Component({
  selector: 'demi-card-list',
  template: `
    @if(items$ | async; as items){
    <div class="d-flex flex-wrap justify-content-around">
      @for(item of items | fullsearch: searchValue; track $index){
      <demi-card
        [config]="config"
        [item]="item"
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
export class DemiCardListComponent<T extends DemiCardItem>
  implements OnInit, OnDestroy
{
  private subToolbar!: Subscription;

  @Input() items$!: Observable<T[]>;
  @Input() config!: DemiCardConfig;

  @Output() onCardTouched: EventEmitter<T> = new EventEmitter();

  public searchValue: string = '';

  constructor(private readonly tbService: DemiToolbarService) {}

  ngOnInit(): void {
    this.subToolbar = this.tbService
      .searchObservable()
      .subscribe((value) => (this.searchValue = value ?? ''));
  }

  public cardTouched(response: T): void {
    this.onCardTouched.emit(response);
  }

  ngOnDestroy(): void {
    this.subToolbar.unsubscribe();
  }
}
