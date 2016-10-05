// Angular Components
import { Renderer, ViewChild, ViewChildren, AfterViewInit, Component, OnInit, ElementRef, trigger, state, style, transition, animate, HostListener } from '@angular/core';
import { Router } from '@angular/router';
// Services
import { HandleProjectsService } from '../services/handleProjects.service';
import { BlurService } from '../services/blur.service';

declare let $: any;

@Component({
    selector: 'my-home',
    templateUrl: '../templates/home.component.html',
    styles: [require('../styles/home.component.css').toString()],
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

export class HomeComponent implements OnInit {
    private blurStateString: string;
    private slideTwice: boolean;
    private mov: boolean;
    private trans: number;
    private wh: number;
    private eas: string;
    private cont: number;
    private blurred: boolean;
    private projectsState: number;
    constructor(private router: Router, private renderer: Renderer, private handleProjectsService: HandleProjectsService, private blurService: BlurService) {
        this.trans = 800;
        this.eas = 'cubic-bezier(1,0,0,1)';
    }

    ngOnInit() {
        this.blurred = false;
        this.slideTwice = false;
        this.mov = false;
        this.cont = 0;
        this.blurStateString = 'inactive';
        this.projectsState = this.handleProjectsService.currentProjectsState;
        this.checkHandleProjectsService();
        this.checkBlurService();
        this.activateSwipeListener();
        this.initialiseProjects();
    }

    @HostListener('window:keydown', ['$event']) keyboardInput(event: any) {
        if ((event.which == 38) && (this.cont != 0) && !this.mov && !this.blurred) {
            this.slideUp(this.cont);
        }
        // down
        else if ((event.which == 40) && (this.cont != 2) && !this.mov && !this.blurred) {
            this.slideDown(this.cont);
        }
        // exit this handler for other keys
        else return;
        event.preventDefault(); // prevent the default action (scroll / move caret)
    }

    @HostListener('window:mousewheel', ['$event']) muoseWheel(event: any) {
        if ((event.deltaY < 0) && (this.cont != 0) && !this.mov && !this.blurred) {
            this.slideUp(this.cont);
        }
        if ((event.deltaY > 0) && (this.cont != 2) && !this.mov && !this.blurred) {
            this.slideDown(this.cont);
        }
    }

    private initialiseProjects(): void {
        $("#contentsReserve #section0").clone().appendTo("main");
        $("#sideNavButton" + this.cont).addClass("sideNavButtonChecked" + this.cont);
        $("#phoneText").addClass("phoneTextCol" + this.cont);
        $(".menuLine").addClass("menuLineCol" + this.cont);
        $("#contactText").addClass("headerText" + this.cont);
        $(".menuText").addClass("headerText" + this.cont);
    }

    private checkBlurService(): void {
        this.blurService.activeBlurStateObservable.subscribe(
            response => response ? this.blurStateString = 'active' : this.blurStateString = 'inactive',
            error => console.log('Error! Description: ' + error)
        );
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
                            this.slideDouble('up');
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
                            this.slideDouble('down');
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
        // $("#phoneText").removeClass("phoneTextCol" + cs);
        // $(".menuLine").removeClass("menuLineCol" + cs);
        // $("#contactText").removeClass("headerText" + cs);
        // $(".menuText").removeClass("headerText" + cs);
        // $("#logo" + cs).velocity("fadeOut", { duration: this.trans });
        // $("#logo" + ns).velocity("fadeIn", { duration: this.trans });

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
        // $("#phoneText").addClass("phoneTextCol" + ns);
        // $(".menuLine").addClass("menuLineCol" + ns);
        // $("#contactText").addClass("headerText" + ns);
        // $(".menuText").addClass("headerText" + ns);

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
        // $("#phoneText").removeClass("phoneTextCol" + cs);
        // $(".menuLine").removeClass("menuLineCol" + cs);
        // $("#contactText").removeClass("headerText" + cs);
        // $(".menuText").removeClass("headerText" + cs);
        // $("#logo" + cs).velocity("fadeOut", { duration: this.trans });
        // $("#logo" + ns).velocity("fadeIn", { duration: this.trans });

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
        // $("#logo").addClass("logo" + ns);
        // $("#phoneText").addClass("phoneTextCol" + ns);
        // $(".menuLine").addClass("menuLineCol" + ns);
        // $("#contactText").addClass("headerText" + ns);
        // $(".menuText").addClass("headerText" + ns);

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

    private slideDouble(direction: string) {
        let chainDefSD: any = $.Deferred();
        chainDefSD.then(this.firstSlideTwice.bind(this, direction))
            .then(this.secondSlideTwice.bind(this, direction));
        chainDefSD.resolve();
    }

    private firstSlideTwice(direction: string): any {
        this.slideTwice = true;
        this.mov = true;
        let def1s = new $.Deferred();
        switch (direction) {
            case 'up':
                this.slideUp(this.cont);
                break;
            case 'down':
                this.slideDown(this.cont);
                break;
            default:
                throw ('slideDirection error');
        }
        setTimeout(function () {
            def1s.resolve();
        }, this.trans);
        return def1s.promise();
    }

    private secondSlideTwice(direction: string): any {
        let def2s = new $.Deferred();
        switch (direction) {
            case 'up':
                this.slideUp(this.cont);
                break;
            case 'down':
                this.slideDown(this.cont);
                break;
            default:
                throw ('slideDirection error');
        }
        setTimeout(this.secondSlideTwiceTimeOut.bind(this, def2s), this.trans);
        return def2s.promise();
    }

    private secondSlideTwiceTimeOut(def2s: any): void {
        def2s.resolve();
        this.mov = false;
        this.slideTwice = false;
    }

    private activateSwipeListener(): void {
        $("main").swipe({
            swipe: this.swipeFunction.bind(this),
            threshold: 0,
            fingers: "all"
        });
    }

    private swipeFunction(event: any, direction: string, distance: number, duration: number, fingerCount: number, fingerData: any): void {
        if ((direction === "down") && (this.cont != 0) && !this.mov && !this.blurred) {
            this.slideUp(this.cont);
        } else if ((direction === "up") && (this.cont != 2) && !this.mov && !this.blurred) {
            this.slideDown(this.cont);
        } else return;
    }


  
}
