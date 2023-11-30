import { Directive, ElementRef, HostListener, Input } from '@angular/core';

export type DemiScrollIndicatorType = 'side' | 'float';

@Directive({
    selector: '[demiScrollIndicator]',
    exportAs: 'demiScrollIndicator',
    standalone: true,
})
export class DemiScrollIndicatorDirective {
  @Input() type: DemiScrollIndicatorType = 'side';
  @Input() iconColor = 'var(--color-accent)';

  constructor(private el: ElementRef) {}

  /**
   * Listens to the scroll event and handles it based on the indicator type
   * @param event
   */
  @HostListener('scroll', ['$event'])
  onScroll(event: Event) {
    if (this.type === 'side') this.normalScrollHandlerSide();
  }

  /**
   * Listens to the window resize event and checks scroll visibility
   * @param event
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScrollVisibility();
  }

  /**
   * Initializes the scroll indicators
   */
  public initScrollIndicators(): void {
    this.wrappContent();
    this.addScrollIndicators();
    this.checkScrollVisibility();
  }

  /**
   * Adds scroll indicators based on the indicator type
   */
  private addScrollIndicators(): void {
    if (this.type === 'side')
      this.addScrollIndicatorsSide(this.el.nativeElement);
    else this.addScrollIndicatorsFloat(this.el.nativeElement);
  }

  /**
   * Adds side scroll indicators to the parent element
   * @param parentElement
   */
  private addScrollIndicatorsSide(parentElement: HTMLElement): void {
    const scrollContainer = document.createElement('div');
    scrollContainer.classList.add('scroll-indicators');
    scrollContainer.style.height = `calc(${parentElement.style.height}px - 2px)`;
    scrollContainer.style.position = 'sticky';
    scrollContainer.style.top = '0';
    scrollContainer.style.display = 'flex';
    scrollContainer.style.flexDirection = 'column';
    scrollContainer.style.justifyContent = 'space-between';
    scrollContainer.style.alignItems = 'flex-end';
    scrollContainer.style.padding = '3px';
    scrollContainer.innerHTML +=
      this.setScrollIcon('scroll-top', 90) +
      this.setScrollIcon('scroll-bottom', 270);

    parentElement.append(scrollContainer);
  }

  /**
   * Adds floating scroll indicators to the parent element
   * @param parentElement
   */
  private addScrollIndicatorsFloat(parentElement: HTMLElement): void {
    const scrollContainer = document.createElement('div');
    scrollContainer.classList.add('scroll-indicators');
    scrollContainer.style.height = `100%`;
    scrollContainer.style.position = 'absolute';
    scrollContainer.style.top = '0';
    scrollContainer.style.right = '0';
    scrollContainer.style.display = 'flex';
    scrollContainer.style.flexDirection = 'column';
    scrollContainer.style.justifyContent = 'space-between';
    scrollContainer.style.alignItems = 'flex-end';
    scrollContainer.style.padding = '3px';
    scrollContainer.innerHTML +=
      this.setScrollIcon('scroll-top', 90) +
      this.setScrollIcon('scroll-bottom', 270);

    parentElement.style.position = 'relative';
    parentElement.append(scrollContainer);
  }

  /**
   * Wraps content and sets up scroll event listener based on the indicator type
   */
  private wrappContent(): void {
    const scrollContent = document.createElement('div');
    scrollContent.classList.add('scroll-content');
    scrollContent.style.width = '100%';
    if (this.type === 'float') {
      scrollContent.style.overflow = 'auto';
      scrollContent.addEventListener('scroll', () =>
        this.normalScrollHandlerFloat()
      );
    }
    const childs = [...this.el.nativeElement.childNodes];
    childs.forEach((node: ChildNode) => {
      scrollContent.appendChild(node);
    });
    this.el.nativeElement.appendChild(scrollContent);
  }

  /**
   * Handles scroll behavior for the side scroll indicator
   */
  private normalScrollHandlerSide(): void {
    let hideTop = false;
    let hideBottom = false;

    const topIndicator = this.el.nativeElement.querySelector(
      '#scroll-top'
    ) as HTMLElement;
    const bottomIndicator = this.el.nativeElement.querySelector(
      '#scroll-bottom'
    ) as HTMLElement;

    if (this.el.nativeElement.scrollTop <= 10) {
      hideTop = true;
    } else if (
      this.el.nativeElement.scrollTop + this.el.nativeElement.clientHeight >=
      this.el.nativeElement.scrollHeight - 10
    ) {
      hideBottom = true;
    }

    if (
      this.el.nativeElement.clientHeight >= this.el.nativeElement.scrollHeight
    ) {
      hideTop = true;
      hideBottom = true;
    }

    topIndicator.style.visibility = hideTop ? 'hidden' : 'visible';
    bottomIndicator.style.visibility = hideBottom ? 'hidden' : 'visible';
  }

  /**
   * Handles scroll behavior for the float scroll indicator
   */
  private normalScrollHandlerFloat(): void {
    let hideTop = false;
    let hideBottom = false;

    const scrollContent =
      this.el.nativeElement.querySelector('.scroll-content');
    const topIndicator = this.el.nativeElement.querySelector(
      '#scroll-top'
    ) as HTMLElement;
    const bottomIndicator = this.el.nativeElement.querySelector(
      '#scroll-bottom'
    ) as HTMLElement;

    if (scrollContent.scrollTop <= 10) {
      hideTop = true;
    } else if (
      scrollContent.scrollTop + scrollContent.clientHeight >=
      scrollContent.scrollHeight - 10
    ) {
      hideBottom = true;
    }

    if (scrollContent.clientHeight >= scrollContent.scrollHeight) {
      hideTop = true;
      hideBottom = true;
    }

    topIndicator.style.visibility = hideTop ? 'hidden' : 'visible';
    bottomIndicator.style.visibility = hideBottom ? 'hidden' : 'visible';
  }

  /**
   * Checks scroll visibility after a timeout
   */
  private checkScrollVisibility(): void {
    setTimeout(() => {
      if (this.type === 'side') this.normalScrollHandlerSide();
      else this.normalScrollHandlerFloat();
    }, 50);
  }

  /**
   * Sets the SVG scroll icon with provided ID and rotation degree
   * @param id
   * @param rotationDeg
   * @returns
   */
  private setScrollIcon(id: string, rotationDeg: number): string {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" viewBox="0 0 256 256" style="height: 20px; width: 20px;" id="${id}">
      <g>
        <g transform="rotate(${rotationDeg} 127.9874954223633,128)" id="svg_1">
          <g id="svg_2">
            <path id="svg_3" d="m33,140.9c-12.3,-7.1 -12.3,-18.7 0,-25.8l176.9,-102.1c12.3,-7.1 22.3,-1.3 22.3,12.9l0,204.2c0,14.2 -10,20 -22.3,12.9l-176.9,-102.1z" fill="${this.iconColor}"/>
          </g>
        </g>
      </g>
    </svg>`;
  }
}
