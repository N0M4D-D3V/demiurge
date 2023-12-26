import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  DemiToolbarMenuItemConfig,
  DemiToolbarConfig,
} from '../../interfaces/toolbar.interface';
import {
  NgFor,
  NgClass,
  NgIf,
  UpperCasePipe,
  TitleCasePipe,
} from '@angular/common';
import { DemiUser } from 'projects/demiurge/src/lib/interfaces/user.interface';
import { DemiCardComponent } from '../../../cards/components/card/card.component';
import {
  DemiCardConfig,
  DemiCardItem,
  DemiCardSize,
} from '../../../cards/interfaces/card.interface';

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
    DemiCardComponent,
  ],
})
export class DemiToggleMenuComponent implements OnInit {
  @Input() user?: DemiUser;
  @Input() config!: DemiToolbarConfig;

  @Output() onLogout: EventEmitter<void> = new EventEmitter<void>();

  public item?: DemiCardItem;
  public profileCardConfig: DemiCardConfig = {
    displayImg: true,
    size: DemiCardSize.Res,
  };
  public currentPath: string = this.config?.defaultPath || '';

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    if (this.user) {
      this.item = {
        title: this.user.displayName,
        subtitle: this.user.email,
        imgUrl: this.user.photoURL,
      };
    }
  }

  public navigate(item: DemiToolbarMenuItemConfig): void {
    this.currentPath = item.url;
    this.router.navigate([item.url]);
  }

  public logout(): void {
    this.onLogout.emit();
  }
}
