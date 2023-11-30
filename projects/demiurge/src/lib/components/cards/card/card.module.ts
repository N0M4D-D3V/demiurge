import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemiCardComponent } from './card.component';

@NgModule({
    exports: [DemiCardComponent],
    imports: [CommonModule, DemiCardComponent],
    providers: [],
    bootstrap: [],
})
export class DemiCardModule {}
