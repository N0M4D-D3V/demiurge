import { Component, ComponentRef, ElementRef } from '@angular/core';
import { DemiModalResponse, DemiModalStyles } from './modal.interface';
import {
  style,
  animate,
  trigger,
  transition,
  state,
  AnimationBuilder,
  AnimationMetadata,
  AnimationPlayer,
  AnimationFactory,
} from '@angular/animations';

const ANIMATION_DURATION_MS = 300;

@Component({
  selector: 'demi-modal',
  template: `
    <div class="overlay">
      <div class="modal-dialog">
        <div
          class="modal-content"
          [@position]="animOrigin ? 'origin' : 'moved'"
        >
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('position', [
      state(
        'origin',
        style({
          transform: 'translate(0%, 0%)',
        })
      ),
      state(
        'moved',
        style({
          transform: 'translate(-33%, 0%)',
        })
      ),
      transition('origin => moved', animate(300 + 'ms ease-in-out')),
      transition('moved => origin', animate(300 + 'ms ease-in-out')),
    ]),
  ],
  standalone: true,
})
export class DemiModalComponent {
  /**
   *   true = open state | false = closed state
   * */
  public isOpen: boolean = false;
  public animOrigin: boolean = true;
  private animPlayer: AnimationPlayer | undefined;
  public animationDuration: number = ANIMATION_DURATION_MS;
  private modalPosition: 'top' | 'center' | 'bottom' = 'center';

  public modalPromise: Promise<any>;
  private modalResolve: any;

  constructor(
    private elementRef: ElementRef,
    private animationBuilder: AnimationBuilder
  ) {
    this.modalPromise = new Promise((resolve) => {
      this.modalResolve = resolve;
    });
  }

  onClose(
    componentRef: ComponentRef<DemiModalComponent>,
    response?: DemiModalResponse<any>
  ) {
    this.modalResolve(response);
    this.playExitAnimation(componentRef);
  }

  public playEntryAnimation() {
    this.setPosition('in');
    this.animPlayer?.play();
  }

  public playExitAnimation(componentRef: ComponentRef<DemiModalComponent>) {
    this.setPosition('out');
    this.animPlayer?.play();
    this.animPlayer?.onDone(() => {
      componentRef.destroy();
    });
  }

  public setStyles(newStyles?: DemiModalStyles) {
    const dialog = this.elementRef.nativeElement.querySelector(
      '.modal-dialog'
    ) as HTMLElement;
    const modalContainer = dialog.querySelector(
      '.modal-content'
    ) as HTMLElement;

    dialog.style.background;

    dialog.style.backgroundColor = newStyles?.backdropColor
      ? newStyles.backdropColor
      : 'transparent';

    modalContainer.style.backgroundColor = newStyles?.backgroundColor
      ? newStyles.backgroundColor
      : '#232323';
    modalContainer.style.borderColor = newStyles?.borderColor
      ? newStyles?.borderColor
      : 'var(--color-primary)';

    this.setOrientationSizes(
      modalContainer,
      newStyles!.width,
      newStyles!.height
    );

    this.modalPosition = newStyles?.position ?? 'center';
  }

  private setOrientationSizes(
    modalContent: HTMLElement,
    width: { vertical: string; horizontal?: string },
    height: { vertical: string; horizontal?: string }
  ) {
    const mediaQuery = window.matchMedia('(orientation: portrait)');

    try {
      if (mediaQuery.matches) {
        modalContent.style.width = width.vertical || '0';
        modalContent.style.height = height.vertical || '0';
      } else {
        modalContent.style.width = width.horizontal
          ? width.horizontal
          : width.vertical;
        modalContent.style.height = height.horizontal
          ? height.horizontal
          : height.vertical;
      }
    } catch (error) {
      throw new Error(
        `width or height were not provided when creating the modal, please introduce both sizes correctly`
      );
    }

    mediaQuery.addEventListener('change', (event) => {
      if (event.matches) {
        modalContent.style.width = width.vertical || '0';
        modalContent.style.height = height.vertical || '0';
      } else {
        modalContent.style.width = width.horizontal
          ? width.horizontal
          : width.vertical;
        modalContent.style.height = height.horizontal
          ? height.horizontal
          : height.vertical;
      }
    });
  }

  private setPosition(animationState: 'in' | 'out') {
    const dialog = this.elementRef.nativeElement.querySelector(
      '.modal-dialog'
    ) as HTMLElement;
    const modalContainer = dialog.querySelector(
      '.modal-content'
    ) as HTMLElement;

    let factory: AnimationFactory;

    switch (this.modalPosition) {
      case 'top':
        if (animationState === 'in')
          factory = this.animationBuilder.build(this.setSlideInAnimation(-70));
        else
          factory = this.animationBuilder.build(this.setSlideOutAnimation(-70));
        break;

      case 'bottom':
        if (animationState === 'in')
          factory = this.animationBuilder.build(this.setSlideInAnimation(60));
        else
          factory = this.animationBuilder.build(this.setSlideOutAnimation(60));
        break;

      case 'center':
      default:
        if (animationState === 'in')
          factory = this.animationBuilder.build(this.setSlideInAnimation(0));
        else
          factory = this.animationBuilder.build(this.setSlideOutAnimation(0));
        break;
    }
    this.animPlayer = factory.create(modalContainer);
  }

  setSlideInAnimation(finishPosition: number): AnimationMetadata[] {
    return [
      style({ transform: `translate(0%, 100%)` }),
      animate(
        '300ms',
        style({ transform: `translate(0%, ${finishPosition}%)` })
      ),
    ];
  }

  setSlideOutAnimation(initPosition: number): AnimationMetadata[] {
    return [
      style({ transform: `translate(0%, ${initPosition}%)` }),
      animate('300ms', style({ transform: `translate(0%, 200%)` })),
    ];
  }
}
