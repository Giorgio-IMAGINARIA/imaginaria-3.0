import { Directive, ElementRef, HostListener} from '@angular/core';
declare var TweenLite: any;
@Directive({
  selector: '[GSAPRotate]'
})
export class GSAPRotateDirective {
  private el: HTMLElement;
  private transHoverLogo: number;
  private am: number;

  constructor(el: ElementRef) {
    this.transHoverLogo = 1;
    this.el = el.nativeElement;
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.rotate(360);
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.rotate(-360);
  }
  private rotate(am:number) {
    TweenLite.to(this.el, this.transHoverLogo, { rotation: "" + am + "deg" });
  }
}
