import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
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
import { DemiAlertService } from '../../../../services/alert/alert.service';

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
    cssClass: 'bg-transparent border-primary',
  };

  constructor(
    private readonly ref: ViewContainerRef,
    private readonly router: Router,
    private readonly alert: DemiAlertService
  ) {}

  ngOnInit(): void {
    this.alert.initAlertService(this.ref);

    if (this.user) {
      this.item = {
        title: this.user.displayName ?? this.config.defaultTitle,
        subtitle: this.user.email,
        imgUrl: this.user.photoURL ?? this.config.defaultProfileImgPath,
      };
    }
  }

  public navigate(item: DemiToolbarMenuItemConfig): void {
    this.router.navigate([item.url]);
  }

  public logout(): void {
    this.alert.create({
      title: 'Alert',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          label: 'YES',
          role: 'cancel',
          handler: () => this.onLogout.emit(),
        },
        {
          label: 'NO',
          role: 'continue',
        },
      ],
    });
  }
}
