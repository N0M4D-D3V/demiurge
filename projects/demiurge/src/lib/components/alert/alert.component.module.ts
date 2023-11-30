import { NgModule } from '@angular/core';
import { DemiAlertComponent } from './alert.component';
import { CommonModule } from '@angular/common';

@NgModule({
    exports: [DemiAlertComponent],
    imports: [CommonModule, DemiAlertComponent],
})
export class DemiAlertComponentModule {}
