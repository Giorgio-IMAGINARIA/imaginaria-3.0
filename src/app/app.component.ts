import { Component, trigger, state, style, transition, animate, OnInit,  HostListener } from '@angular/core';
import {WindmillBlueComponent} from './components/windmillBlue.component';
import {WindmillRedComponent} from './components/windmillRed.component';
import {WindmillWhiteComponent} from './components/windmillWhite.component';
import {MbiLogoComponent} from './components/mbiLogo.component';
import {GitHubLogoComponent} from './components/gitHubLogo.component';
import {LinkedInLogoComponent} from './components/linkedInLogo.component';
import {FaceBookLogoComponent} from './components/faceBookLogo.component';
import { BlurService } from './services/blur.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
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
                transform: 'translateX(-250px)'
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

  @HostListener('window:orientationchange', ['$event']) onorientationchange(event: any) {
        location.reload();
    }

    @HostListener('window:load', ['$event']) onLoad(event: any) {
        window.scrollTo(0, 0);
    }
    @HostListener('window:touchstart', ['$event']) ontouchstart(event: any) {
        window.scrollTo(0, 0);
    }

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