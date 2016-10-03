// Angular Components
import { Renderer, ViewChild, ViewChildren, AfterViewInit, Component, OnInit, ElementRef, trigger, state, style, transition, animate } from '@angular/core';
import { Router } from '@angular/router';
// App Components
import { ProjectToRenderComponent } from './projectToRender.component';
// Services
import { HandleProjectsService } from '../services/handleProjects.service';

declare let $: any;

@Component({
    selector: 'my-home',
    templateUrl: '../templates/home.component.html',
    styles: [require('../styles/home.component.css').toString()],
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
export class HomeComponent implements OnInit, AfterViewInit {
    // @ViewChild(ProjectToRenderComponent) private localProjectToRenderComponent: ProjectToRenderComponent;
    private slideTwice: boolean;
    private mov: boolean;
    private trans: number;
    private wh: number;
    private eas: string;
    private cont: number;
    private blurred: boolean;
    private menuState: string;
    private projectsState: number;
    constructor(private router: Router, private renderer: Renderer, private handleProjectsService: HandleProjectsService) {
        this.trans = 800;
        this.eas = 'cubic-bezier(1,0,0,1)';
    }
    ngOnInit() {
        this.blurred = false;
        this.slideTwice = false;
        this.mov = false;
        this.cont = 0;
        this.menuState = 'inactive';
        this.projectsState = this.handleProjectsService.currentProjectsState;
        console.log('this.projectsState: ', this.projectsState);
        this.checkHandleProjectsService();
    }
    private checkHandleProjectsService(): void {
        this.handleProjectsService.projectsStateObservable.subscribe(
            response => {
                console.log('important!!!: ', this.cont);
                console.log('response from handleProjectsService: ', response);
                this.projectsState = response;

                switch (response) {
                    case 0:
                        if ((this.cont == 1) && !this.mov && !this.blurred) {
                            this.slideUp(this.cont);
                        }

                        if ((this.cont == 2) && !this.mov && !this.blurred) {
                            this.slideUpTwice();
                        }
                        break;
                    case 1:
                        if ((this.cont == 0) && !this.mov && !this.blurred) {
                            console.log('first step');
                            this.slideDown(this.cont);
                        }
                        if ((this.cont == 2) && !this.mov && !this.blurred) {
                            this.slideUp(this.cont);
                        }
                        break;
                    case 2:
                        console.log('this.cont: ', this.cont);
                        if ((this.cont == 0) && !this.mov && !this.blurred) {
                            this.slideDownTwice()
                        }
                        if ((this.cont == 1) && !this.mov && !this.blurred) {
                            console.log('second step');

                            this.slideDown(this.cont);
                        }
                        break;
                    default:
                        throw ('toggleLeftPanel error');
                }

            },
            error => console.log('Error! Description: ' + error)
        );
    }



    private slideDown(cs: number): void {
        if (!this.slideTwice) this.mov = true;
        $("main #section" + cs).remove();
        delete $("main #section" + cs);
        $("#contentsReserve #section" + cs).clone().appendTo("main");
        let ns = cs + 1;
        $("#contentsReserve #section" + ns).clone().appendTo("main");
        $("#sideNav a Div").removeClass("sideNavButtonChecked" + cs);
        $("#phoneText").removeClass("phoneTextCol" + cs);
        $(".menuLine").removeClass("menuLineCol" + cs);
        $("#contactText").removeClass("headerText" + cs);
        $(".menuText").removeClass("headerText" + cs);
        $("#logo" + cs).velocity("fadeOut", { duration: this.trans });
        $("#logo" + ns).velocity("fadeIn", { duration: this.trans });

        this.wh = $(window).height();
        $("main #section" + ns).css('top', this.wh);

        $("main #section" + cs).css("-webkit-transform", "translateY(-" + this.wh + "px)");
        $("main #section" + cs).css("-moz-transform", "translateY(-" + this.wh + "px)");
        $("main #section" + cs).css("-ms-transform", "translateY(-" + this.wh + "px)");
        $("main #section" + cs).css("-o-transform", "translateY(-" + this.wh + "px)");
        $("main #section" + cs).css("transform", "translateY(-" + this.wh + "px)");

        $("main #section" + cs).css("-webkit-transition-duration", this.trans / 1000 + "s");
        $("main #section" + cs).css("-moz-transition-duration", this.trans / 1000 + "s");
        $("main #section" + cs).css("-o-transition-duration", this.trans / 1000 + "s");
        $("main #section" + cs).css("transition-duration", this.trans / 1000 + "s");

        $("main #section" + cs).css("-webkit-transition-timing-function", this.eas);
        $("main #section" + cs).css("-moz-transition-timing-function", this.eas);
        $("main #section" + cs).css("-o-transition-timing-function", this.eas);
        $("main #section" + cs).css("transition-timing-function", this.eas);

        $("#sideNavButton" + ns).addClass("sideNavButtonChecked" + ns);
        $("#phoneText").addClass("phoneTextCol" + ns);
        $(".menuLine").addClass("menuLineCol" + ns);
        $("#contactText").addClass("headerText" + ns);
        $(".menuText").addClass("headerText" + ns);

        $("main #section" + ns).css("-webkit-transform", "translateY(-" + this.wh + "px)");
        $("main #section" + ns).css("-moz-transform", "translateY(-" + this.wh + "px)");
        $("main #section" + ns).css("-ms-transform", "translateY(-" + this.wh + "px)");
        $("main #section" + ns).css("-o-transform", "translateY(-" + this.wh + "px)");
        $("main #section" + ns).css("transform", "translateY(-" + this.wh + "px)");

        $("main #section" + ns).css("-webkit-transition-duration", this.trans / 1000 + "s");
        $("main #section" + ns).css("-moz-transition-duration", this.trans / 1000 + "s");
        $("main #section" + ns).css("-o-transition-duration", this.trans / 1000 + "s");
        $("main #section" + ns).css("transition-duration", this.trans / 1000 + "s");

        $("main #section" + ns).css("-webkit-transition-timing-function", this.eas);
        $("main #section" + ns).css("-moz-transition-timing-function", this.eas);
        $("main #section" + ns).css("-o-transition-timing-function", this.eas);
        $("main #section" + ns).css("transition-timing-function", this.eas);
        setTimeout(this.afterSlideOnce.bind(this, cs, ns), this.trans);
    }




    private slideUp(cs: number): void {
        if (!this.slideTwice) this.mov = true;
        $("main #section" + cs).remove();
        delete $("main #section" + cs);
        $("#contentsReserve #section" + cs).clone().appendTo("main");
        let ns = cs - 1;
        $("#sideNav a Div").removeClass("sideNavButtonChecked" + cs);
        $("#phoneText").removeClass("phoneTextCol" + cs);
        $(".menuLine").removeClass("menuLineCol" + cs);
        $("#contactText").removeClass("headerText" + cs);
        $(".menuText").removeClass("headerText" + cs);
        $("#logo" + cs).velocity("fadeOut", { duration: this.trans });
        $("#logo" + ns).velocity("fadeIn", { duration: this.trans });

        $("#contentsReserve #section" + ns).clone().prependTo("main");
        $("#sideNav a Div").removeClass("sideNavButtonChecked" + cs);

        this.wh = $(window).height();
        $("main #section" + ns).css('top', -this.wh);

        $("main #section" + cs).css("-webkit-transform", "translateY(" + this.wh + "px)");
        $("main #section" + cs).css("-moz-transform", "translateY(" + this.wh + "px)");
        $("main #section" + cs).css("-ms-transform", "translateY(" + this.wh + "px)");
        $("main #section" + cs).css("-o-transform", "translateY(" + this.wh + "px)");
        $("main #section" + cs).css("transform", "translateY(" + this.wh + "px)");

        $("main #section" + cs).css("-webkit-transition-duration", this.trans / 1000 + "s");
        $("main #section" + cs).css("-moz-transition-duration", this.trans / 1000 + "s");
        $("main #section" + cs).css("-o-transition-duration", this.trans / 1000 + "s");
        $("main #section" + cs).css("transition-duration", this.trans / 1000 + "s");

        $("main #section" + cs).css("-webkit-transition-timing-function", this.eas);
        $("main #section" + cs).css("-moz-transition-timing-function", this.eas);
        $("main #section" + cs).css("-o-transition-timing-function", this.eas);
        $("main #section" + cs).css("transition-timing-function", this.eas);

        $("#sideNavButton" + ns).addClass("sideNavButtonChecked" + ns);
        $("#logo").addClass("logo" + ns);
        $("#phoneText").addClass("phoneTextCol" + ns);
        $(".menuLine").addClass("menuLineCol" + ns);
        $("#contactText").addClass("headerText" + ns);
        $(".menuText").addClass("headerText" + ns);

        $("main #section" + ns).css("-webkit-transform", "translateY(" + this.wh + "px)");
        $("main #section" + ns).css("-moz-transform", "translateY(" + this.wh + "px)");
        $("main #section" + ns).css("-ms-transform", "translateY(" + this.wh + "px)");
        $("main #section" + ns).css("-o-transform", "translateY(" + this.wh + "px)");
        $("main #section" + ns).css("transform", "translateY(" + this.wh + "px)");

        $("main #section" + ns).css("-webkit-transition-duration", this.trans / 1000 + "s");
        $("main #section" + ns).css("-moz-transition-duration", this.trans / 1000 + "s");
        $("main #section" + ns).css("-o-transition-duration", this.trans / 1000 + "s");
        $("main #section" + ns).css("transition-duration", this.trans / 1000 + "s");

        $("main #section" + ns).css("-webkit-transition-timing-function", this.eas);
        $("main #section" + ns).css("-moz-transition-timing-function", this.eas);
        $("main #section" + ns).css("-o-transition-timing-function", this.eas);
        $("main #section" + ns).css("transition-timing-function", this.eas);

        setTimeout(this.afterSlideOnce.bind(this, cs, ns), this.trans);
    }

    private afterSlideOnce(cs: number, ns: number): void {
        $("main #section" + cs).remove();
        delete $("main #section" + cs);
        this.cont = ns;
        $("#sideNavButton" + this.cont).addClass("sideNavButtonChecked");
        if (!this.slideTwice) this.mov = false;
    }
    private firstSlideTwice(): any {
        this.slideTwice = true;
        this.mov = true;
        let def1s = new $.Deferred();
        this.slideDown(this.cont);
        setTimeout(function () {
            def1s.resolve();
        }, this.trans);
        return def1s.promise();
    }
    private secondSlideTwice(): any {
        let def2s = new $.Deferred();
        this.slideDown(this.cont);
        setTimeout(this.secondSlideTwiceTimeOut.bind(this, def2s), this.trans);
        return def2s.promise();
    }
    private secondSlideTwiceTimeOut(def2s: any): void {
        def2s.resolve();
        this.mov = false;
        this.slideTwice = false;
    }

    private slideDownTwice() {
        let chainDefSD = $.Deferred();
        chainDefSD.then(this.firstSlideTwice.bind(this))
            .then(this.secondSlideTwice.bind(this));
        chainDefSD.resolve();
    }

    private slideUpTwice() {
        let chainDefSU = $.Deferred();
        chainDefSU.then(function () {



            this.slideTwice = true;
            this.mov = true;
            let def1s = new $.Deferred();
            this.slideUp(this.cont);
            setTimeout(function () {

                def1s.resolve();

            }, this.trans);
            return def1s.promise();





        })
            .then(function () {
                let def2s = new $.Deferred();
                this.slideUp(this.cont);
                setTimeout(function () {
                    def2s.resolve();
                    this.mov = false;
                    this.slideTwice = false;
                }, this.trans);
                return def2s.promise();
            });
        chainDefSU.resolve();
    }








    ngAfterViewInit() {
        // alert('ciao');
        // console.log(this.localProjectToRenderComponent);
        // console.log('this.localProjectToRenderComponent.nativeElement',this.localProjectToRenderComponent.nativeElement)
        // this.renderer.invokeElementMethod(this.localProjectToRenderComponent.nativeElement,'focus')
    }
    toggleMenu() {
        if (this.menuState === 'active') {
            this.menuState = 'inactive';
        } else {
            this.menuState = 'active';
        }
    }
}
