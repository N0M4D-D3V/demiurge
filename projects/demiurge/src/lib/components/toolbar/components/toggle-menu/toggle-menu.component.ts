import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  DemiToggleMenuItemConfig,
  DemiToolbarConfig,
} from '../../interfaces/toolbar.interface';

@Component({
  selector: 'demi-toggle-menu',
  templateUrl: './toggle-menu.component.html',
  styleUrls: [],
})
export class DemiToggleMenuComponent {
  @Input() config!: DemiToolbarConfig;

  public currentPath: string = this.config.defaultPath;

  constructor(private readonly router: Router) {}

  public navigate(item: DemiToggleMenuItemConfig): void {
    this.currentPath = item.url;
    this.router.navigate([item.url]);
  }
}
