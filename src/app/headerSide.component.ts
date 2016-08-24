import { Component } from '@angular/core';
import {WindmillBlueComponent} from './windmillBlue.component.ts';
import {WindmillRedComponent} from './windmillRed.component.ts';
import {WindmillWhiteComponent} from './windmillWhite.component.ts';
import {MbiLogoComponent} from './mbiLogo.component.ts';
import {GitHubLogoComponent} from './gitHubLogo.component.ts';
import {LinkedInLogoComponent} from './linkedInLogo.component.ts';
import {FaceBookLogoComponent} from './faceBookLogo.component.ts';
@Component({
    selector: 'header-side',
    templateUrl: 'headerSide.component.html',
    styles: [require('../../public/css/Generic-page/headerSide.css').toString()],
        directives: [WindmillBlueComponent, WindmillRedComponent, WindmillWhiteComponent, MbiLogoComponent, GitHubLogoComponent, LinkedInLogoComponent, FaceBookLogoComponent],

})
export class HeaderSide  {
    
}