import { Directive, ElementRef, HostListener, Input } from '@angular/core';
@Directive({
  selector: '[myBlur]'
})
export class BlurDirective {
  private el: HTMLElement;
  constructor(el: ElementRef) { this.el = el.nativeElement; }
  @HostListener('mouseenter') onMouseEnter() {
    this.toggleBlur();
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.toggleBlur();
  }
  private toggleBlur() {
    // this.el.style.backgroundColor = color;
  }
}
