import { Component, ComponentRef, DestroyRef, Input } from '@angular/core';
import { DemiAlertService } from '../../services/alert/alert.service';
import { DemiAlertButton } from './alert.interface';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'demi-alert',
  template: `
    <div class="overlay" [ngClass]="{ 'dark-mode': darkMode }">
      <div class="alert-box" [ngClass]="{ 'dark-mode': darkMode }">
        <h2 style="margin: 0; font-size: 20px">{{ title }}</h2>
        <h4 style="margin: 0; font-size: 14px; margin-top:10px">
          {{ message }}
        </h4>
        <div class="d-flex">
          @for(btn of buttons; track btn.label; let l = $last){
          <button
            (click)="onClick(btn?.handler)"
            [class]="btn.role ?? ''"
            [ngClass]="{
              'dark-mode': darkMode,
              last: l
            }"
          >
            {{ btn.label }}
          </button>
          }
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./alert.component.scss'],
  standalone: true,
  imports: [NgClass, NgFor],
})
export class DemiAlertComponent {
  @Input() title: string = '';
  @Input() message?: string;
  @Input() buttons: DemiAlertButton[] = [];
  @Input() darkMode: boolean = true;

  public alertPromise: Promise<any>;
  private alertResolve: any;

  constructor(
    private readonly ref: DestroyRef,
    private readonly alertCtrl: DemiAlertService
  ) {
    this.alertPromise = new Promise((resolve) => {
      this.alertResolve = resolve;
    });
  }

  public onClose(componentRef: ComponentRef<DemiAlertComponent>) {
    this.alertResolve();
    componentRef.destroy();
  }

  public onClick(handler?: () => void) {
    this.ref.onDestroy(() => {
      if (handler) handler();
    });
    this.alertCtrl.close();
  }
}
