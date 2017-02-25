import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { WorksComponent } from './components/works.component';
import { AboutComponent } from './components/about.component';
import { ContactComponent } from './components/contact.component';
import { HomeComponent } from './components/home.component';
import { Dots } from './components/dots.component';
import { WindmillBlackComponent } from './components/windmillBlack.component';
import { MbiLogoComponent } from './components/mbiLogo.component';
import { GitHubLogoComponent } from './components/gitHubLogo.component';
import { LinkedInLogoComponent } from './components/linkedInLogo.component';
import { FaceBookLogoComponent } from './components/faceBookLogo.component';

import { GSAPBounceDirective } from './directives/GSAPBounce.directive';
import { GSAPRotateDirective } from './directives/GSAPRotate.directive';

import { BlurService } from './services/blur.service';
import { HandleProjectsService } from './services/handleProjects.service';
import { MessagesService } from './services/messages.service';
import { DbWorksService } from './services/db.works.service';
import { DbProjChoiceService } from './services/db.projChoice.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule
  ],
  declarations: [
    WindmillBlackComponent,
    MbiLogoComponent,
    GitHubLogoComponent,
    LinkedInLogoComponent,
    FaceBookLogoComponent,
    AppComponent,
    AboutComponent,
    WorksComponent,
    ContactComponent,
    HomeComponent,
    Dots,
    GSAPBounceDirective,
    GSAPRotateDirective
  ],
  providers: [
    BlurService, HandleProjectsService, MessagesService, DbWorksService, DbProjChoiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }