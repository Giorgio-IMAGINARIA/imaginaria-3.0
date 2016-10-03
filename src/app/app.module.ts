import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { DashboardComponent } from './components/dashboard.component';
import { HeroesComponent } from './components/heroes.component';
import { HeroDetailComponent } from './components/hero-detail.component';
import { HomeComponent } from './components/home.component';
import { Dots } from './components/dots.component';
import { WindmillBlueComponent } from './components/windmillBlue.component';
import { WindmillRedComponent } from './components/windmillRed.component';
import { WindmillWhiteComponent } from './components/windmillWhite.component';
import { MbiLogoComponent } from './components/mbiLogo.component';
import { GitHubLogoComponent } from './components/gitHubLogo.component';
import { LinkedInLogoComponent } from './components/linkedInLogo.component';
import { FaceBookLogoComponent } from './components/faceBookLogo.component';

import { HighlightDirective } from './directives/highlight.directive';
import { BlurDirective } from './directives/blur.directive';

import { HeroService } from './services/hero.service';
import { BlurService } from './services/blur.service';
import { HandleProjectsService } from './services/handleProjects.service';

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
    HighlightDirective,
    BlurDirective
  ],
  providers: [
    HeroService, BlurService, HandleProjectsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }