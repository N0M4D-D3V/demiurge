import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import {
  DemiToolbarMenuItemConfig,
  DemiToolbarConfig,
} from './interfaces/toolbar.interface';
import { Location } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'demi-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class DemiToolbarComponent implements OnInit {
  @Input() config!: DemiToolbarConfig;
  @Output() onLogout: EventEmitter<void> = new EventEmitter<void>();

  public currentConfig!: DemiToolbarMenuItemConfig | undefined;

  constructor(
    private readonly router: Router,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((item: Event) => item instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentConfig = this.config.items.find(
          (item) => item.url === event.url
        );
      });
  }

  public logout(): void {
    this.onLogout.emit();
  }

  public onBack(): void {
    this.location.back();
  }
}
