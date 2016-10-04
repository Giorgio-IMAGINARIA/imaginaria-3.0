import { Component, OnInit,trigger, state, style, transition, animate } from '@angular/core';
import { Router } from '@angular/router';

import { BlurService } from '../services/blur.service';


@Component({
    selector: 'my-works',
    templateUrl: '../templates/works.component.html',
    styleUrls: ['../styles/works.component.css'],
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

export class WorksComponent implements OnInit {
    private blurStateString: string;


   

    constructor(private blurService: BlurService) {
                this.blurStateString = 'inactive';

    }

    ngOnInit() {
                this.checkBlurService();

    }
 private checkBlurService(): void {
        this.blurService.activeBlurStateObservable.subscribe(
            response => response ? this.blurStateString = 'active' : this.blurStateString = 'inactive',
            error => console.log('Error! Description: ' + error)
        );
    }
    
}