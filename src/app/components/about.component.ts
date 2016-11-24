import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
//Services
import { BlurService } from '../services/blur.service';

declare let $: any;

@Component({
    selector: 'my-about',
    templateUrl: '../templates/about.component.html',
    styleUrls: ['../styles/about.component.css'],
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

export class AboutComponent implements OnInit {
    private blurStateString: string;

    constructor(private blurService: BlurService) {}

    ngOnInit() {
        window.scrollTo(0, 0);
        this.checkBlurService();
        if (this.blurService.currentBlurState) {
            this.blurStateString = 'active';
            $('body').css('overflow', 'hidden');
        }
    }
    private checkBlurService(): void {
        this.blurService.activeBlurStateObservable.subscribe(
            response => {
                if (response) {
                    this.blurStateString = 'active';
                    $('body').css('overflow', 'hidden');
                } else {
                    this.blurStateString = 'inactive';
                    $('body').css('overflow', 'initial');
                }
            },
            error => console.log('Error! Description: ' + error)
        );
    }
}
