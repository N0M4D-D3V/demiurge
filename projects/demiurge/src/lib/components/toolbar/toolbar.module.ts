import { NgModule } from '@angular/core';
import { DemiToolbarComponent } from './toolbar.component';
import { CommonModule } from '@angular/common';
import { DemiToggleMenuComponent } from './components/toggle-menu/toggle-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DemiToolbarComponent, DemiToggleMenuComponent],
  exports: [DemiToolbarComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [],
})
export class DemiToolbarModule {}
