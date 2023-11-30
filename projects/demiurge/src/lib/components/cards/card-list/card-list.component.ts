import { Component, Input } from '@angular/core';
import { DemiCardConfig } from '../card/card.interface';
import { DemiCardComponent } from '../card/card.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'demi-card-list',
    templateUrl: './card-list.component.html',
    styleUrls: [],
    standalone: true,
    imports: [
        NgFor,
        DemiCardComponent,
        NgIf,
    ],
})
export class DemiCardListComponent {
  @Input() configList!: DemiCardConfig[];
}
