import { Component} from '@angular/core';

@Component({
  selector: 'dots',
  templateUrl: './dots.component.html',
  styles: [require('../../public/css/Home/dots.css').toString()]
})
export class Dots {
   changeProject() {
        // console.log('CHANGE PROJECT!!!');
        // console.log('this.localProjectToRenderComponent.nativeElement',this.localProjectToRenderComponent.nativeElement)
        // console.log(this.localProjectToRenderComponent);
        // this.renderer
    }
}