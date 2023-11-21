import { Component, Input } from '@angular/core';
import { DemiCardConfig } from '../card/card.interface';

@Component({
  selector: 'demi-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: [],
})
export class DemiCardListComponent {
  @Input() configList!: DemiCardConfig[];
}
