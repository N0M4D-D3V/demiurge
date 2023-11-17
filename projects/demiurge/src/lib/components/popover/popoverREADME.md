The code below is an example of creation of a popover using this library and how to handle the result coming from the popover

```typescript
this.PopoverService.create({
  clickedElement: event.target,
  component: AirportListSelectComponent,
  data: {
    titleComponent: "AIRPORT",
    airfieldList: this.airfieldList,
  },
  styles: {
    arrowPosition: "top",
    position: "right",
    height: { vertical: "50%" },
    width: { vertical: "30%", horizontal: "60%" },
  },
}).then(async (response: EfbPopoverResponse<AirportDto>) => {
  if (response?.role === "create") {
    response.data = (await this.onCreateAirport(event))?.data;
    if (response?.data) {
      this.popoverOpenerService.openNext("airport");
    }
  }
  this.onAirportDismiss(response?.data, key);
  this.animationController.deselectItem();
});
```
