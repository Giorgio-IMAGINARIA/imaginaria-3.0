import { Directive, ElementRef, HostListener, Input,trigger,
  state,
  style,
  transition,
  animate  } from '@angular/core';
@Directive({
  selector: '[myBlur]',
})
export class BlurDirective {
  private el: HTMLElement;
  constructor(el: ElementRef) { this.el = el.nativeElement; }
  @HostListener('mouseenter') onMouseEnter() {
    this.toggleBlur(true);
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.toggleBlur(false);
  }
  private toggleBlur(parameter:boolean) {
    if (parameter){
console.log('blur on');
    } else {
console.log('blur off');
    }
  }
}
