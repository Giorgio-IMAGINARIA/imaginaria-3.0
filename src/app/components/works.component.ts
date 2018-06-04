import { Component, OnInit, trigger, state, style, transition, animate, Renderer } from '@angular/core';
//Services
import { BlurService } from '../services/blur.service';
import { DbWorksService } from '../services/db.works.service';


declare let $: any;

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
    private items: Array<any> = null;
    private blurServiceListener: any;
    private dbWorksServiceListener: any;


    constructor(private dbWorksService: DbWorksService, private blurService: BlurService, private renderer: Renderer) { }

    ngOnInit() {
        this.dbWorksService.sendRequest();
        this.checkDbWorksService();
        window.scrollTo(0, 0);
        this.checkBlurService();
        if (this.blurService.currentBlurState) {
            this.blurStateString = 'active';
            $('body').css('overflow', 'hidden');
        }
    }

    ngOnDestroy(): void {
        this.dbWorksServiceListener.unsubscribe();
        this.blurServiceListener.unsubscribe();
    }

    private checkDbWorksService(): void {
        this.dbWorksServiceListener = this.dbWorksService.activeDbWorksStateObservable.subscribe(
            response => {
                if (response) {
                    // console.log('the response for works is: ', response);
                    this.items = response;
                } else {
                    // console.log('no response for the works');
                }
            },
            error => console.log('Error! Description: ' + error)
        );
    }

    private checkBlurService(): void {
        this.blurServiceListener = this.blurService.activeBlurStateObservable.subscribe(
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