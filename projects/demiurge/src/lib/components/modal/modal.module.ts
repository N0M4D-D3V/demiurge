import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DemiModalComponent } from './modal.component';
import { DemiModalService } from './modal.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule],
  declarations: [DemiModalComponent],
  providers: [DemiModalService],
})
export class DemiModalModule {}
