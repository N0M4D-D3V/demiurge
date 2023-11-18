import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemiCardComponent } from './card.component';

@NgModule({
  declarations: [DemiCardComponent],
  exports: [DemiCardComponent],
  imports: [CommonModule],
  providers: [],
  bootstrap: [],
})
export class DemiCardModule {}
