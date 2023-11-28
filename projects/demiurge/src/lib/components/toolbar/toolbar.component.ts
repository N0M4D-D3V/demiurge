import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationStart, Router, Event } from '@angular/router';
import { DemiToolbarConfig } from './interfaces/toolbar.interface';

@Component({
  selector: 'demi-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class DemiToolbarComponent implements OnInit {
  @Input() config!: DemiToolbarConfig;
  @Output() onLogout: EventEmitter<void> = new EventEmitter<void>();

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        const splitted: string[] = event.url.split('/');
        this.config.title = splitted[splitted.length - 1].replaceAll('-', ' ');
        if (this.config.title === 'login') this.config.toggleable = false;
        else this.config.toggleable = true;
      }
    });
  }

  public logout(): void {
    this.onLogout.emit();
  }
}
