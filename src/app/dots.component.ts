import { Component, OnInit, trigger, state, style, transition, animate} from '@angular/core';
import { BlurService } from './blur.service';

@Component({
  selector: 'dots',
  templateUrl: './dots.component.html',
  styles: [require('../../public/css/Home/dots.css').toString()],
  animations: [
    trigger('toBlur', [
      state('inactive', style({
        "-webkit-filter": 'blur(0px)',
        filter: 'blur(0px)'
      })),
      state('active', style({
        "-webkit-filter": 'blur(10px)',
        filter: 'blur(10px)'
      })),
      transition('inactive => active', animate('500ms ease-in')),
      transition('active => inactive', animate('500ms ease-out'))
    ])]
})

export class Dots implements OnInit {

  private initialBlurState: boolean;
  private blurStateString: string = 'inactive';
  constructor(private blurService: BlurService) { }

  // getinitialBlurState(): void {
  //   this.initialBlurState = this.blurService.getinitialBlurState();
  //   if (this.initialBlurState) {
  //     this.blurStateString = 'active'
  //   } else {
  //     this.blurStateString = 'inactive'
  //   }
  // }

  changeProject() {
    // console.log('CHANGE PROJECT!!!');
    // console.log('this.localProjectToRenderComponent.nativeElement',this.localProjectToRenderComponent.nativeElement)
    // console.log(this.localProjectToRenderComponent);
    // this.renderer
  }

  ngOnInit(): void {
    // this.getinitialBlurState();
    this.blurService.activeBlurStateObservable.subscribe(
      response => {
        if (response) {
          this.blurStateString = 'active'
        } else {
          this.blurStateString = 'inactive'
        }
      },
      error => console.log('Error! Description: ' + error)
    );
  }

}