import { Directive, ElementRef, HostListener, Input } from '@angular/core';
declare var TimelineLite: any;
@Directive({
  selector: '[GSAPBounce]'
})
export class GSAPBounceDirective {
  private el: HTMLElement;
  private transHoverMenu: number;

  constructor(el: ElementRef) {
    this.transHoverMenu = 0.1;
    this.el = el.nativeElement;
  }
  @Input('GSAPBounce') levelToTarget: string;
  @HostListener('mouseenter') onMouseEnter() {
    this.bounce(this.levelToTarget);
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.bounce(this.levelToTarget);
  }
  private bounce(applyTo:string) {
    let tl = new TimelineLite();
    let elementToAffect: HTMLElement;

    switch (applyTo) {
      case 'parent':
        elementToAffect = this.el.parentElement;
        break;
      case 'sameElement':
        elementToAffect = this.el;
        break;
      default: throw new Error("error in GSAPBounce.directive");
    }

    tl.to(elementToAffect, this.transHoverMenu, { scale: 1.3 }).to(elementToAffect, this.transHoverMenu, { scale: 1 });
  }
}
