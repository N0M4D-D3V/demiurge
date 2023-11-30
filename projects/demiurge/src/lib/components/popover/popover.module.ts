import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DemiPopoverComponent } from './components/popover/popover.component';
import { DemiPopoverService } from './services/popover.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [BrowserModule, BrowserAnimationsModule, DemiPopoverComponent],
    exports: [DemiPopoverComponent],
    providers: [DemiPopoverService],
})
export class DemiPopoverModule {}
