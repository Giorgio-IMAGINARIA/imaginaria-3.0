import { Component, OnInit, trigger, state, style, transition, animate} from '@angular/core';
import { BlurService } from '../services/blur.service';

@Component({
  selector: 'dots',
  templateUrl: '../templates/dots.component.html',
  styles: [require('../styles/dots.component.css').toString()],
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

  changeProject(project:number) {
    console.log('project selected: ', project);
    // console.log('this.localProjectToRenderComponent.nativeElement',this.localProjectToRenderComponent.nativeElement)
    // console.log(this.localProjectToRenderComponent);
    // this.renderer
  }

  ngOnInit(): void {
    this.blurService.activeBlurStateObservable.subscribe(
      response => response? this.blurStateString = 'active' : this.blurStateString = 'inactive',
      error => console.log('Error! Description: ' + error)
    );
  }

}