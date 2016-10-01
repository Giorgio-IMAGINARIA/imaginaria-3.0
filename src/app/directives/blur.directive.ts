import { Directive, ElementRef, HostListener, Input,trigger,
  state,
  style,
  transition,
  animate  } from '@angular/core';
@Directive({
  selector: '[myBlur]',
  // animations: [
  //       trigger('toBlur', [
  //           state('inactive', style({
  //               "-webkit-filter": 'blur(0px)',
  //               filter: 'blur(0px)'
  //           })),
  //           state('active', style({
  //               "-webkit-filter": 'blur(10px)',
  //               filter: 'blur(10px)'
  //           })),
  //           transition('inactive => active', animate('500ms ease-in')),
  //           transition('active => inactive', animate('500ms ease-out'))
  //       ])]
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
