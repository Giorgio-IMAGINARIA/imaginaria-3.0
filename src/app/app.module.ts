import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { routing }        from './app.routing';

import { DashboardComponent } from './dashboard.component';
import { HeroesComponent }  from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HomeComponent } from './home.component';
import { Dots } from './dots.component';
import {WindmillBlueComponent} from './windmillBlue.component.ts';
import {WindmillRedComponent} from './windmillRed.component.ts';
import {WindmillWhiteComponent} from './windmillWhite.component.ts';
import {MbiLogoComponent} from './mbiLogo.component.ts';
import {GitHubLogoComponent} from './gitHubLogo.component.ts';
import {LinkedInLogoComponent} from './linkedInLogo.component.ts';
import {FaceBookLogoComponent} from './faceBookLogo.component.ts';
import {ProjectToRenderComponent} from './projectToRender.component.ts';

import { HighlightDirective } from './highlight.directive';
import { BlurDirective } from './blur.directive';

import { HeroService }  from './hero.service';
import { BlurService } from './blur.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing
  ],
  declarations: [
    WindmillBlueComponent,
    WindmillRedComponent,
    WindmillWhiteComponent,
    MbiLogoComponent,
    GitHubLogoComponent,
    LinkedInLogoComponent,
    FaceBookLogoComponent,
    AppComponent,
    HeroesComponent,
    DashboardComponent,
    HeroDetailComponent,
    HomeComponent,
    Dots,
    ProjectToRenderComponent,
    HighlightDirective,
    BlurDirective
  ],
  providers: [
    HeroService, BlurService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }