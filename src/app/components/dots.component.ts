import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { BlurService } from '../services/blur.service';
import { HandleProjectsService } from '../services/handleProjects.service';
import { DbProjChoiceService } from '../services/db.projChoice.service';
interface DbProjChoicePropertiesInterface {
  description: string,
  href: string
  title: string,
  urlbackground: string,
  isChecked: boolean
}

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
  private dbProjChoiceServiceListener: any;
  private blurServiceListener: any;
  private handleProjectsServiceListener: any;
  private buttonChecked: boolean = false;
  private items: Array<DbProjChoicePropertiesInterface> = [];
  private blurStateString: string;
  private projectsState: number;

  constructor(private dbProjChoiceService: DbProjChoiceService, private blurService: BlurService, private handleProjectsService: HandleProjectsService) { }

  ngOnInit(): void {
    this.checkBlurService();
    this.checkDbProjChoiceService();
    this.checkHandleProjectsService();

    if (this.blurService.currentBlurState) {
      this.blurStateString = 'active';
    }
  }
    ngOnDestroy(): void {
        this.dbProjChoiceServiceListener.unsubscribe();
        this.blurServiceListener.unsubscribe();
        this.handleProjectsServiceListener.unsubscribe();
    }

  private checkBlurService(): void {
    this.blurServiceListener = this.blurService.activeBlurStateObservable.subscribe(
      response => response ? this.blurStateString = 'active' : this.blurStateString = 'inactive',
      error => console.log('Error! Description: ' + error)
    );
  }

  private checkDbProjChoiceService(): void {
    this.dbProjChoiceServiceListener = this.dbProjChoiceService.activeDbProjChoiceStateObservable.subscribe(
      response => {
        if (response) {
          console.log('the response for dots is: ', response);
          for (var i = 0; i < response.length; i++) {
            this.items[i] = { description: null, href: null, title: null, urlbackground: null, isChecked: null }
            this.items[i].description = response[i].description;
            this.items[i].href = response[i].href;
            this.items[i].title = response[i].title;
            this.items[i].urlbackground = response[i].urlbackground;
            if (i === 0) {
              this.items[i].isChecked = true;
            } else {
              this.items[i].isChecked = false;
            }
          }
        } else {
          console.log('no response for the dots');
        }
      },
      error => console.log('Error! Description: ' + error)
    );
  }

  private checkHandleProjectsService(): void {
    this.handleProjectsServiceListener = this.handleProjectsService.projectsStateObservable.subscribe(
      response => {
        console.log('response from handleProjectsService-dots: ', response);
        this.projectsState = response;

        for (var i = 0; i < this.items.length; i++) {
          this.items[i].isChecked = false;
        }
        this.items[response].isChecked = true;
      },
      error => console.log('Error! Description: ' + error)
    );
  }

  changeProject(i: number) {
    this.handleProjectsService.setProjectsState(i);
  }

}