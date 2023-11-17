import { Injectable, ViewContainerRef } from '@angular/core';
import { DemiPopoverComponent } from '../components/popover/popover.component';
import {
  DemiPopoverInitialization,
  DemiPopoverResponse,
  DemiPopoverStorage,
} from '../popover.interface';

@Injectable({ providedIn: 'root' })
export class DemiPopoverService {
  private viewContainerRef: ViewContainerRef | null = null;

  /**
   * Each item contains a reference of the popover and their clicked item which activated it
   */
  private popoverInstancesActives: DemiPopoverStorage[] = [];

  /**
   * It only needs to be called once at the beggining of the application for example at
   * the ngAfterViewInit of the app.component.ts, It's needed for store the view reference
   * where the popover is going to be placed at the element tree of the DOM
   *
   * @param appViewRef ViewContainerRef of the main project root application
   */
  initPopoverService(appViewRef: ViewContainerRef) {
    this.viewContainerRef = appViewRef;
  }

  create(options: DemiPopoverInitialization<any>): Promise<any> {
    if (this.viewContainerRef) {
      //Creates the main popover component, is placed alongside the clicked item and the styles are set
      const popoverContainer =
        this.viewContainerRef.createComponent(DemiPopoverComponent);
      popoverContainer.instance.setPosition(
        options.clickedElement.getBoundingClientRect(),
        options.styles.position
      );
      popoverContainer.instance.setStyles(options.styles);

      //Creates the popover content component from the main project
      const componentReference = this.viewContainerRef.createComponent(
        options.component
      );

      // Then the Inputs from the component are filled
      if (options.data && componentReference) {
        const componentInstance = componentReference.instance;
        Object.assign(componentInstance, options.data);
        componentReference.changeDetectorRef.detectChanges();
      }

      // The popover component is placed in DOM and then the main poject component is placed inside the popover
      this.viewContainerRef.insert(popoverContainer.hostView);
      popoverContainer.location.nativeElement
        .querySelector('.popover-content')
        .appendChild(componentReference.location.nativeElement);

      this.popoverInstancesActives.push({
        popoverCaller: options.clickedElement,
        popoverReference: popoverContainer,
      });

      return popoverContainer.instance.popoverPromise;
    } else {
      throw new Error(`Seems that viewContainerRef has not been initialized properly at the beggining of 
        the application, please make sure you have used the initPopoverService() 
        function in the app.component.ts of your main project`);
    }
  }

  /**
   * Closes the popover and sends the information back to the application
   * @param response can be empty, so no info will be passed
   */
  async close(response?: DemiPopoverResponse<any>) {
    // retrieves the latest opened popover from the storage
    const currentPopover = this.popoverInstancesActives.pop();

    if (currentPopover) {
      // resolves the promise with the data (can be null)
      // changes the state of the popover so it can play the exit animation
      // once the animation is finished it destroys the popover
      currentPopover.popoverReference.instance.onClose(
        currentPopover.popoverReference,
        response
      );
    }
  }

  /**
   * This function should be called when the orientation of the screen changes to realign the popover with their item caller
   *  */
  public async repositionPopovers() {
    //console.log("STARTING ALL REPOSITIONING");
    let count = 0;
    for (const instance of this.popoverInstancesActives) {
      //console.log(`STARTING '${count}' REPOSITIONING`);
      instance.popoverReference.instance.setPosition(
        instance.popoverCaller.getBoundingClientRect()
      );
      instance.popoverReference.instance.autoAdjustPopover();
      await instance.popoverReference.instance.playOrientationChangeAnimation();
      //console.log(`POPOVER '${count}' FINISHED`);
      count++;
    }

    //console.log("FINISHING ALL REPOSITIONING");
  }

  public getTopPopover() {
    return this.popoverInstancesActives[this.popoverInstancesActives.length - 1]
      .popoverReference.instance;
  }
}
