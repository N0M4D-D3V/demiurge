import { Injectable, ViewContainerRef } from '@angular/core';
import { DemiModalComponent } from './modal.component';
import {
  DemiModalInitialization,
  DemiModalResponse,
  DemiModalStorage,
} from './modal.interface';

@Injectable({ providedIn: 'root' })
export class DemiModalService {
  private viewContainerRef: ViewContainerRef | null = null;

  /**
   * Each item contains a reference of the modal and their clicked item which activated it
   */
  private modalInstancesActives: DemiModalStorage[] = [];

  /**
   * It only needs to be called once at the beggining of the application for example at
   * the ngAfterViewInit of the app.component.ts, It's needed for store the view reference
   * where the modal is going to be placed at the element tree of the DOM
   *
   * @param appViewRef ViewContainerRef of the main project root application
   */
  initModalService(appViewRef: ViewContainerRef) {
    this.viewContainerRef = appViewRef;
  }

  create(options: DemiModalInitialization<any>): Promise<any> {
    if (this.viewContainerRef) {
      //Creates the main modal component, is placed alongside the clicked item and the styles are set
      const modalContainer =
        this.viewContainerRef.createComponent(DemiModalComponent);
      modalContainer.instance.setStyles(options.styles);

      //Creates the modal content component from the main project
      const componentReference = this.viewContainerRef.createComponent(
        options.component
      );
      // Then the Inputs from the component are filled
      if (options.data && componentReference) {
        const componentInstance = componentReference.instance;
        Object.assign(componentInstance, options.data);
        componentReference.changeDetectorRef.detectChanges();
      }

      // The modal component is placed in DOM and then the main poject component is placed inside the modal
      this.viewContainerRef.insert(modalContainer.hostView);
      modalContainer.location.nativeElement
        .querySelector('.modal-content')
        .appendChild(componentReference.location.nativeElement);

      this.modalInstancesActives.push({ modalReference: modalContainer });

      modalContainer.instance.playEntryAnimation();

      return modalContainer.instance.modalPromise;
    } else {
      throw new Error(`Seems that viewContainerRef has not been initialized properly at the beggining of 
        the application, please make sure you have used the initModalService() 
        function in the app.component.ts of your main project`);
    }
  }

  /**
   * Closes the modal and sends the information back to the application
   * @param response can be empty, so no info won't be passed
   */
  async close(response?: DemiModalResponse<any>) {
    // retrieves the latest opened modal from the storage
    const currentModal = this.modalInstancesActives.pop();

    if (currentModal) {
      // resolves the promise with the data (can be null)
      // changes the state of the modal so it can play the exit animation
      //currentModal.modalReference.instance.isOpen = false;
      currentModal.modalReference.instance.onClose(
        currentModal.modalReference,
        response
      );
    }
  }

  public getTopModal() {
    return this.modalInstancesActives[this.modalInstancesActives.length - 1]
      .modalReference.instance;
  }

  public removeAllPopovers() {
    while (this.modalInstancesActives.length !== 0) {
      const modal = this.modalInstancesActives.pop();
      modal!.modalReference.instance.onClose(modal!.modalReference, {});
    }
  }
}
