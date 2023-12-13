import { ComponentRef } from '@angular/core';
import { DemiAlertComponent } from './alert.component';

export interface DemiAlertItem {
  title: string;
  message?: string;
  buttons: DemiAlertButton[];
  darkMode?: boolean;
}

export interface DemiAlertButton {
  label: string;
  /**
   * @none default - won't modify the label at all
   * @continue will put the label with bold
   * @cancel will put the label with red
   */
  role?: 'continue' | 'cancel';
  handler?: () => void;
}

export interface DemiAlertStorage {
  alertReference: ComponentRef<DemiAlertComponent>;
}
