import { ComponentRef, Type } from '@angular/core';
import { DemiPopoverComponent } from './components/popover/popover.component';

export interface DemiPopoverResponse<T = any> {
  data?: T;
  role?: string;
  id?: string;
}

export interface DemiPopoverStyles {
  position: 'left' | 'right';
  /**
   * If possible, units should be in "vw" or "%" for responsiveness of the popover
   */
  width: DemiPopoverMatchMediaSizes;
  /**
   * (NOT YET IMPLEMENTED)
   * If "true" the popover will dismiss if clicked outside
   */
  backdropDismiss?: boolean;
  /**
   * If possible, units should be in "vh" or "%" for responsiveness of the popover
   */
  height?: DemiPopoverMatchMediaSizes;
  arrowPosition?:
    | 'auto'
    | 'top'
    | 'middle-top'
    | 'middle'
    | 'middle-bottom'
    | 'bottom';
  /**
   * Position of the popover from the clicked item
   */

  delay?: number;
  backgroundColor?: string;
  borderColor?: string;
  backdropColor?: string;
}

export interface DemiPopoverStorage {
  popoverCaller: HTMLElement;
  popoverReference: ComponentRef<DemiPopoverComponent>;
}

export interface DemiPopoverInitialization<T> {
  component: Type<T>;
  clickedElement: HTMLElement;
  data: any;
  styles: DemiPopoverStyles;
}

export interface DemiPopoverMatchMediaSizes {
  vertical: string;
  horizontal?: string;
}

/**
 * @deprecated this interface will be replaced with the DemiAnimationData from the animation service interface and in future updates it shall be removed
 */
export interface DemiPopoverAnimationData_Legacy {
  originStyle:
    | '*'
    | {
        [key: string]: string | number;
      }
    | Array<
        | '*'
        | {
            [key: string]: string | number;
          }
      >;
  finishStyle:
    | '*'
    | {
        [key: string]: string | number;
      }
    | Array<
        | '*'
        | {
            [key: string]: string | number;
          }
      >;
  /**
   * In ms (miliseconds)
   */
  duration: number;
}

/**
 * @deprecated this interface will be replaced with the DemiAnimationCycle from the animation service interface and in future updates it shall be removed
 */
export interface DemiAnimationCycle_Legacy {
  id: string;
  screenOrientation: 'onlyPortrait' | 'onlyLandscape' | 'both';
  initAnimation: DemiPopoverAnimationData_Legacy;

  /**
   * If not provided it will play the reverse animation of 'initAnimation'
   */
  backAnimation?: DemiPopoverAnimationData_Legacy;
}
