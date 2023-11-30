import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
} from '@angular/core';
import {
  style,
  animate,
  AnimationPlayer,
  AnimationFactory,
  AnimationMetadata,
  AnimationBuilder,
} from '@angular/animations';
import {
  DemiPopoverStyles,
  DemiPopoverResponse,
  DemiAnimationCycle_Legacy,
  DemiPopoverAnimationData_Legacy,
} from '../../popover.interface';
import { NgClass } from '@angular/common';

const ANIMATION_DURATION_MS = 100;

@Component({
    selector: 'demi-popover',
    template: `
    <div class="popover-dialog">
      <div class="popover-container d-flex">
        <div class="arrow"></div>
        <div class="popover-content" [ngClass]="arrowPosition">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
    styleUrls: ['./popover.component.scss'],
    animations: [],
    standalone: true,
    imports: [NgClass],
})
export class DemiPopoverComponent implements AfterViewInit {
  /**
   *   true = open state | false = closed state
   * */
  public isOpen: boolean = false;
  public animationDuration: number = ANIMATION_DURATION_MS;
  public arrowPosition:
    | 'auto'
    | 'top'
    | 'middle-top'
    | 'middle'
    | 'middle-bottom'
    | 'bottom' = 'auto';

  private _animPlayer: AnimationPlayer | undefined;
  //public _animOrientationPlayer: AnimationPlayer | undefined;
  public animPlayer: AnimationPlayer | undefined;
  public animationFinished: boolean = false;
  private animationStorage: DemiAnimationCycle_Legacy[] = [];

  public popoverPromise: Promise<any>;
  private popoverResolve: any;

  constructor(
    private elementRef: ElementRef,
    private cdRef: ChangeDetectorRef,
    private animationBuilder: AnimationBuilder
  ) {
    this.popoverPromise = new Promise((resolve) => {
      this.popoverResolve = resolve;
    });
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.autoAdjustPopover();
      this.playEntryAnimation();
    }, 50);
    this.cdRef.detectChanges();
  }

  public onClose(
    componentRef: ComponentRef<DemiPopoverComponent>,
    response?: DemiPopoverResponse<any>
  ) {
    console.log('A punto de hacer la animacion');

    this.playExitAnimation().then(() => {
      console.log('animacion acabada');
      this.popoverResolve(response);
      console.log(componentRef);

      componentRef.destroy();
    });
  }

  public playEntryAnimation() {
    this.switchEntryExitAnim('in');
    this._animPlayer?.play();
  }

  public playExitAnimation() {
    this.switchEntryExitAnim('out');
    return new Promise<void>((resolve) => {
      this._animPlayer?.onDone(() => {
        // Animation is done, destroy animation and resolve the promise
        resolve();
      });

      // Play the animation
      this._animPlayer?.play();
    });
  }

  public setStyles(newStyles?: DemiPopoverStyles) {
    const dialog = this.elementRef.nativeElement.querySelector(
      '.popover-dialog'
    ) as HTMLElement;
    const popoverContainer = this.elementRef.nativeElement.querySelector(
      '.popover-container'
    ) as HTMLElement;
    const popoverContent = dialog.querySelector(
      '.popover-content'
    ) as HTMLElement;
    const arrow = dialog.querySelector('.arrow') as HTMLElement;

    dialog.style.backgroundColor = newStyles?.backdropColor
      ? newStyles.backdropColor
      : 'transparent';

    popoverContainer.style.flexDirection =
      newStyles?.position === 'right' ? 'row' : 'row-reverse';

    popoverContent.style.backgroundColor = newStyles?.backgroundColor
      ? newStyles.backgroundColor
      : 'var(--color-popover-bg)';
    popoverContent.style.borderColor = newStyles?.borderColor
      ? newStyles?.borderColor
      : 'var(--color-accent)';

    arrow.style.borderRight =
      newStyles?.position === 'right'
        ? '10px solid var(--color-accent)'
        : '10px solid transparent';
    arrow.style.borderLeft =
      newStyles?.position === 'right'
        ? '10px solid transparent'
        : '10px solid var(--color-accent)';

    this.arrowPosition = newStyles?.arrowPosition ?? 'auto';

    this.setOrientationSizes(
      popoverContainer,
      newStyles!.width,
      newStyles?.height
    );
  }

  private setOrientationSizes(
    popoverContainer: HTMLElement,
    width: { vertical: string; horizontal?: string },
    height?: { vertical: string; horizontal?: string } | undefined
  ) {
    const mediaQuery = window.matchMedia('(orientation: portrait)');

    try {
      if (mediaQuery.matches) {
        popoverContainer.style.width = width.vertical || '0';
        popoverContainer.style.height = height?.vertical ?? 'fit-content';
      } else {
        popoverContainer.style.width = width.horizontal
          ? width.horizontal
          : width.vertical;
        popoverContainer.style.height = height?.horizontal
          ? height.horizontal
          : height?.vertical ?? 'fit-content';
      }
    } catch (error) {
      throw new Error(
        `width or height were not provided when creating the popover, please introduce both sizes correctly`
      );
    }

    mediaQuery.addEventListener('change', (event) => {
      if (event.matches) {
        popoverContainer.style.width = width.vertical || '0';
        popoverContainer.style.height = height?.vertical ?? 'fit-content';
      } else {
        popoverContainer.style.width = width.horizontal
          ? width.horizontal
          : width.vertical;
        popoverContainer.style.height = height?.horizontal
          ? height.horizontal
          : height?.vertical ?? 'fit-content';
      }
    });
  }

  public setPosition(boundingRect: DOMRect, position?: string) {
    const popoverContainer = this.elementRef.nativeElement.querySelector(
      '.popover-container'
    ) as HTMLElement;
    const arrowElement = this.elementRef.nativeElement.querySelector(
      '.arrow'
    ) as HTMLElement;

    popoverContainer.style.top =
      (
        boundingRect.y +
        boundingRect.height / 2 -
        arrowElement.getBoundingClientRect().height / 2
      ).toString() + 'px';
    if (position === 'left') {
      popoverContainer.style.left = (boundingRect.x - 5).toString() + 'px';
      popoverContainer.style.transform = 'translateX(-100%)';
    } else
      popoverContainer.style.left =
        (boundingRect.x + boundingRect.width - 5).toString() + 'px';
  }

  public autoAdjustPopover() {
    if (this.arrowPosition === 'auto') {
      const content = this.elementRef.nativeElement.querySelector(
        '.popover-content'
      ) as HTMLElement;
      let elementRect = content.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      content.style.transform = `translateY(-${elementRect.height / 2}px)`;

      elementRect = content.getBoundingClientRect();
      let finalAdjustment = `translateY(calc(-${elementRect.height / 2}px`;

      // If popover's top part is not visible then it adjust it to be fully visible
      if (elementRect.top < 0) {
        finalAdjustment += ` - ${elementRect.top}px + 20px`;
      }

      // If popover's bottom part is not visible then it adjust it to be fully visible
      if (elementRect.bottom > viewportHeight) {
        finalAdjustment += ` - ${elementRect.bottom - viewportHeight}px - 20px`;
      }

      finalAdjustment += '))';

      content.style.transform = finalAdjustment;
    }
  }

  private switchEntryExitAnim(animationState: 'in' | 'out') {
    const popoverContainer = this.elementRef.nativeElement.querySelector(
      '.popover-container'
    ) as HTMLElement;
    let factory: AnimationFactory;

    switch (animationState) {
      case 'in':
        factory = this.animationBuilder.build(
          this.setAnimation({
            originStyle: { opacity: '0' },
            finishStyle: { opacity: '1' },
            duration: ANIMATION_DURATION_MS,
          })
        );
        break;

      case 'out':
        factory = this.animationBuilder.build(
          this.setAnimation({
            originStyle: { opacity: '1' },
            finishStyle: { opacity: '0' },
            duration: ANIMATION_DURATION_MS,
          })
        );
        break;
    }
    this._animPlayer = factory.create(popoverContainer);
  }

  private setAnimation(
    animationData: DemiPopoverAnimationData_Legacy
  ): AnimationMetadata[] {
    return [
      style(animationData.originStyle),
      animate(`${animationData.duration}ms`, style(animationData.finishStyle)),
    ];
  }

  public createAnimation(animationData: DemiAnimationCycle_Legacy): void {
    //console.log(this.animationStorage, animationData.id);

    if (this.checkDuplicatedAnimations(animationData)) {
      console.warn(
        "This Popover already has an existing animation with 'id': " +
          animationData.id +
          ", please make sure each animation has their own 'id' property. It'll be overwritten with the new one"
      );
      return;
    }

    if (!animationData.backAnimation) {
      animationData.backAnimation = {
        duration: animationData.initAnimation.duration,
        originStyle: animationData.initAnimation.finishStyle,
        finishStyle: animationData.initAnimation.originStyle,
      };
    }

    this.animationStorage.push(animationData);
  }

  private _playAnimation(
    animationToPlay: DemiPopoverAnimationData_Legacy
  ): Promise<void> {
    const popoverContainer = this.elementRef.nativeElement.querySelector(
      '.popover-container'
    ) as HTMLElement;
    const factory = this.animationBuilder.build(
      this.setAnimation(animationToPlay)
    );
    this.animPlayer = factory.create(popoverContainer);
    //console.log(this.animPlayer);

    return new Promise<void>((resolve) => {
      this.animPlayer?.onDone(() => {
        // Animation is done, destroy animation and resolve the promise
        this.animationFinished = true;
        resolve();
      });

      // Play the animation
      this.animPlayer?.play();
    });
  }

  public playAnimation(
    animationName: string,
    animationCyclePoint: 'init' | 'back'
  ): Promise<void> {
    const popoverContainer = this.elementRef.nativeElement.querySelector(
      '.popover-container'
    ) as HTMLElement;
    const animation = this.getAnimationById(animationName);
    if (animation) {
      const animationToPlay =
        animationCyclePoint === 'init'
          ? animation.initAnimation
          : animation.backAnimation!;

      const factory = this.animationBuilder.build(
        this.setAnimation(animationToPlay)
      );
      this.animPlayer = factory.create(popoverContainer);

      if (
        (matchMedia('(orientation: landscape)').matches &&
          animation.screenOrientation === 'onlyLandscape') ||
        (matchMedia('(orientation: portrait)').matches &&
          animation.screenOrientation === 'onlyPortrait') ||
        animation.screenOrientation === 'both'
      ) {
        return new Promise<void>((resolve) => {
          this.animPlayer?.onDone(() => {
            // Animation is done, destroy animation and resolve the promise
            this.animationFinished = true;
            resolve();
          });

          // Play the animation
          this.animPlayer?.play();
        });
      } else {
        return Promise.resolve();
      }
    } else
      throw new Error('No matching animation with the name: ' + animationName);
  }

  public async createAnimationAndPlay(
    animationData: DemiAnimationCycle_Legacy
  ): Promise<void> {
    if (!this.checkDuplicatedAnimations(animationData)) {
      this.createAnimation(animationData);

      if (
        (matchMedia('(orientation: landscape)').matches &&
          animationData.screenOrientation === 'onlyLandscape') ||
        (matchMedia('(orientation: portrait)').matches &&
          animationData.screenOrientation === 'onlyPortrait') ||
        animationData.screenOrientation === 'both'
      )
        return this._playAnimation(animationData.initAnimation);
      else return Promise.resolve();
    } else
      console.warn(
        "This Popover already has an existing animation with 'id': " +
          animationData.id +
          ", please make sure each animation has their own 'id' property. Please make sure to remove previous animation"
      );
  }

  public async playOrientationChangeAnimation(): Promise<void> {
    const portraitAnim = this.getOrientationSpecifiedAnimations('onlyPortrait');
    const landscapeAnim =
      this.getOrientationSpecifiedAnimations('onlyLandscape');
    if (matchMedia('(orientation: portrait)').matches) {
      if (landscapeAnim) {
        //console.log("PLAYING REVERSE -> Landing animation");
        await this.playAnimation(landscapeAnim.id, 'back');
        //console.log("ENDED REVERSE -> Landing animation");
      }

      if (portraitAnim) {
        //console.log("PLAYING INIT -> Portrait animation");
        await this.playAnimation(portraitAnim.id, 'init');
        //console.log("ENDED INIT -> Portrait animation");
      }
    } else if (matchMedia('(orientation: landscape)').matches) {
      if (portraitAnim) {
        const animationToPlay = {
          ...portraitAnim.backAnimation!,
          duration: 50,
        };
        //console.log("PLAYING REVERSE -> Portrait animation", animationToPlay);
        await this._playAnimation(animationToPlay);
        //console.log("ENDED REVERSE -> Portrait animation");
      }

      if (landscapeAnim) {
        //console.log("PLAYING INIT -> Landing animation");
        await this.playAnimation(landscapeAnim.id, 'init');
        //console.log("ENDED INIT -> Landing animation");
      }
    }

    //console.log("FINISHED ALL ORIENTATION TRANSITIONS AT: ", this);
    return Promise.resolve();
  }

  public removeAnimation(animationId: string) {
    const index = this.animationStorage.findIndex(
      (animation: DemiAnimationCycle_Legacy) => animation.id === animationId
    );
    if (index !== -1) {
      this.animationStorage.splice(index, 1);
    }
  }

  private checkDuplicatedAnimations(
    animationToCheck: DemiAnimationCycle_Legacy
  ) {
    return this.animationStorage.find(
      (animation: DemiAnimationCycle_Legacy) =>
        animation.id === animationToCheck.id
    );
  }

  private getOrientationSpecifiedAnimations(
    orientation: 'onlyPortrait' | 'onlyLandscape'
  ) {
    return this.animationStorage.find(
      (animation: DemiAnimationCycle_Legacy) =>
        animation.screenOrientation === orientation
    );
  }

  private getAnimationById(id: string) {
    return this.animationStorage.find(
      (animation: DemiAnimationCycle_Legacy) => animation.id === id
    );
  }
}
