import { NgModule } from '@angular/core';
import { DemiAlertComponent } from './alert.component';
import { CommonModule } from '@angular/common';

@NgModule({
  exports: [DemiAlertComponent],
  imports: [CommonModule],
  declarations: [DemiAlertComponent],
})
export class DemiAlertComponentModule {}
