import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  DemiToolbarMenuItemConfig,
  DemiToolbarConfig,
} from '../../interfaces/toolbar.interface';
import { NgFor, NgClass, NgIf, UpperCasePipe, TitleCasePipe } from '@angular/common';

@Component({
    selector: 'demi-toggle-menu',
    templateUrl: './toggle-menu.component.html',
    styleUrls: ['./toggle-menu.component.scss'],
    standalone: true,
    imports: [
        NgFor,
        NgClass,
        NgIf,
        UpperCasePipe,
        TitleCasePipe,
    ],
})
export class DemiToggleMenuComponent {
  @Input() config!: DemiToolbarConfig;

  @Output() onLogout: EventEmitter<void> = new EventEmitter<void>();

  public currentPath: string = this.config?.defaultPath || '';

  constructor(private readonly router: Router) {}

  public navigate(item: DemiToolbarMenuItemConfig): void {
    this.currentPath = item.url;
    this.router.navigate([item.url]);
  }

  public logout(): void {
    this.onLogout.emit();
  }
}
