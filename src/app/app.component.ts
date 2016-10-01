import { Component, trigger, state, style, transition, animate, OnInit } from '@angular/core';
import {WindmillBlueComponent} from './windmillBlue.component.ts';
import {WindmillRedComponent} from './windmillRed.component.ts';
import {WindmillWhiteComponent} from './windmillWhite.component.ts';
import {MbiLogoComponent} from './mbiLogo.component.ts';
import {GitHubLogoComponent} from './gitHubLogo.component.ts';
import {LinkedInLogoComponent} from './linkedInLogo.component.ts';
import {FaceBookLogoComponent} from './faceBookLogo.component.ts';
import { BlurService } from './blur.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [BlurService],
    animations: [
        trigger('mask', [
            state('inactive', style({
                backgroundColor: 'transparent',
                zIndex: '-1'
            })),
            state('active', style({
                backgroundColor: '#000000',
                zIndex: '2000'
            })),
            transition('inactive => active', animate('500ms ease-in')),
            transition('active => inactive', animate('500ms ease-out'))
        ]),
        trigger('rightMenu', [
            state('inactive', style({
                transform: 'translateX(0px)'
            })),
            state('active', style({
                transform: 'translateX(-251px)'
            })),
            transition('inactive => active', animate('500ms ease-in')),
            transition('active => inactive', animate('500ms ease-out'))
        ]),
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
export class AppComponent implements OnInit {
    private initialBlurState: boolean;
    private blurStateString: string = 'inactive';

    private menuState: string;

    constructor(private blurService: BlurService) { }
    ngOnInit(): void {
        this.menuState = 'inactive';

        this.blurService.activeBlurStateObservable.subscribe(
            response => response ? this.blurStateString = 'active' : this.blurStateString = 'inactive',
            error => console.log('Error! Description: ' + error)
        );
    }
    toggleMenu() {
        if (this.menuState === 'active') {
            this.setBlurState(false);
            this.menuState = 'inactive';
        } else {
            this.setBlurState(true);
            this.menuState = 'active';
        }
    }
    setBlurState(nextBlurState: boolean): void {
        this.blurService.setBlurState(nextBlurState);
    }
}