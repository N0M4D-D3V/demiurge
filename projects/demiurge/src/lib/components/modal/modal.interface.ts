import { ComponentRef, Type } from '@angular/core';
import { DemiModalComponent } from './modal.component';

export interface DemiModalResponse<T = any> {
  data?: T;
  role?: string;
  id?: string;
}

export interface DemiModalStyles {
  /**
   * If possible, units should be in "vw" or "%" for responsiveness of the modal
   */
  width: { vertical: string; horizontal?: string };
  /**
   * If possible, units should be in "vh" or "%" for responsiveness of the modal
   */
  height: { vertical: string; horizontal?: string };
  backgroundColor?: string;
  borderColor?: string;
  backdropColor?: string;
  position?: 'center' | 'top' | 'bottom';
  delay?: number;
}

export interface DemiModalStorage {
  modalReference: ComponentRef<DemiModalComponent>;
}

export interface DemiModalInitialization<T = any> {
  component: Type<T>;
  data: any;
  styles: DemiModalStyles;
}

export interface DemiModalMatchMediaSizes {
  vertical: string;
  horizontal?: string;
}
