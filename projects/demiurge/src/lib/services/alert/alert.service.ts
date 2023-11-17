import { Injectable, ViewContainerRef } from '@angular/core';
import {
  DemiAlertItem,
  DemiAlertStorage,
} from '../../components/alert/alert.interface';
import { DemiAlertComponent } from '../../components/alert/alert.component';

@Injectable({ providedIn: 'root' })
export class DemiAlertService {
  private viewContainerRef: ViewContainerRef | null = null;

  /**
   * Each item contains a reference of the alert and their clicked item which activated it
   */
  private alertInstancesActives: DemiAlertStorage[] = [];

  /**
   * It only needs to be called once at the beggining of the application for example at
   * the ngAfterViewInit of the app.component.ts, It's needed for store the view reference
   * where the alert is going to be placed at the element tree of the DOM
   * @param appViewRef ViewContainerRef of the main project root application
   */
  initAlertService(appViewRef: ViewContainerRef) {
    this.viewContainerRef = appViewRef;
  }

  create(options: DemiAlertItem): Promise<any> {
    if (this.viewContainerRef) {
      //Creates the main alert component, is placed alongside the clicked item and the styles are set
      const alertComponent =
        this.viewContainerRef.createComponent(DemiAlertComponent);
      console.log(alertComponent.instance);

      // Then the Inputs from the component are filled
      if (options && alertComponent) {
        const componentInstance = alertComponent.instance;
        Object.assign(componentInstance, options);
        alertComponent.changeDetectorRef.detectChanges();
      }

      // The alert component is placed in DOM and then the main poject component is placed inside the alert
      this.viewContainerRef.insert(alertComponent.hostView);

      this.alertInstancesActives.push({
        alertReference: alertComponent,
      });

      return alertComponent.instance.alertPromise;
    } else {
      throw new Error(`Seems that viewContainerRef has not been initialized properly at the beggining of 
        the application, please make sure you have used the initAlertService() 
        function in the app.component.ts of your main project`);
    }
  }

  /**
   * Closes the alert and execute the callback if passed
   */
  async close() {
    // retrieves the latest opened alert from the storage
    const currentAlert = this.alertInstancesActives.pop();

    if (currentAlert) {
      // resolves the promise with the data (can be null)
      // changes the state of the alert so it can play the exit animation
      // once the animation is finished it destroys the alert
      currentAlert.alertReference.instance.onClose(currentAlert.alertReference);
    }
  }
}
