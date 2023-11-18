import { NgModule } from '@angular/core';
import { DemiCardListComponent } from './card-list.component';
import { CommonModule } from '@angular/common';
import { DemiCardModule } from '../card/card.module';

@NgModule({
  declarations: [DemiCardListComponent],
  exports: [DemiCardListComponent],
  imports: [CommonModule, DemiCardModule],
  providers: [],
  bootstrap: [],
})
export class DemiCardListModule {}
