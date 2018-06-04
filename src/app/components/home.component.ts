// Angular Components
import { Renderer, ViewChild, ViewChildren, AfterViewInit, Component, OnInit, ElementRef, trigger, state, style, transition, animate, HostListener, AnimationPlayer } from '@angular/core';
import { Router } from '@angular/router';
// Services
import { HandleProjectsService } from '../services/handleProjects.service';
import { BlurService } from '../services/blur.service';
import { DbProjChoiceService } from '../services/db.projChoice.service';
interface DbProjChoicePropertiesInterface {
    description: string,
    href: string
    title: string,
    urlbackground: string,
    isChecked: boolean
}

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
        ])
    ]
})

export class HomeComponent implements OnInit {
    private dbProjChoiceServiceListener: any;
    private blurServiceListener: any;
    private handleProjectsServiceListener: any;
    private currentWindowHeight: number;
    private arrayOfProjects: Array<DbProjChoicePropertiesInterface> = [];
    private blurStateString: string;
    private slideTwice: boolean;
    private mov: boolean;
    private trans: number;
    private wh: number;
    private eas: string;
    private currentProjectIndex: number;
    private blurred: boolean;
    private nextProjectIndex: number;
    private projectDelta: number;

    private beforeProjectDescription: string;
    private beforeProjectTitle: string;
    private beforeProjectlink: string;

    private currentProjectDescription: string;
    private currentProjectTitle: string;
    private currentProjectlink: string;

    private afterProjectDescription: string;
    private afterProjectTitle: string;
    private afterProjectlink: string;

    private projectSlideBefore: boolean;
    private projectSlideAfter: boolean;
    constructor(private dbProjChoiceService: DbProjChoiceService, private router: Router, private renderer: Renderer, private handleProjectsService: HandleProjectsService, private blurService: BlurService) {
        this.trans = 800;
        this.eas = 'cubic-bezier(1,0,0,1)';
    }
    @ViewChild('projectSectionBefore') projectSectionBeforeElement: ElementRef;
    @ViewChild('projectSection') projectSectionElement: ElementRef;
    @ViewChild('projectSectionAfter') projectSectionAfterElement: ElementRef;

    @HostListener('window:resize', ['$event']) onResize(event: any) {
        this.setScrollDistance();
    }

    @HostListener('window:keydown', ['$event']) keyboardInput(event: any) {
        if ((event.which == 38) && (this.nextProjectIndex != 0) && !this.mov && !this.blurred) {
            this.handleProjectsService.setProjectsState(this.nextProjectIndex - 1);
        }
        // down
        else if ((event.which == 40) && (this.nextProjectIndex != this.arrayOfProjects.length - 1) && !this.mov && !this.blurred) {
            this.handleProjectsService.setProjectsState(this.nextProjectIndex + 1);
        }
        // exit this handler for other keys
        else return;
        event.preventDefault(); // prevent the default action (scroll / move caret)
    }

    @HostListener('window:mousewheel', ['$event']) mouseWheel(event: any) {
        if ((event.deltaY < -40) && (this.nextProjectIndex != 0) && !this.mov && !this.blurred) {
            this.handleProjectsService.setProjectsState(this.nextProjectIndex - 1);
        }
        if ((event.deltaY > 40) && (this.nextProjectIndex != this.arrayOfProjects.length - 1) && !this.mov && !this.blurred) {
            this.handleProjectsService.setProjectsState(this.nextProjectIndex + 1);
        }
        return false;
    }

    ngOnInit() {
        this.nextProjectIndex = this.handleProjectsService.currentProjectsState;
        this.dbProjChoiceService.sendRequest();
        this.setScrollDistance();
        this.checkDbProjChoiceService();
        this.checkHandleProjectsService();
        this.checkBlurService();
        this.activateSwipeListener();
        this.initialiseProjects();
        if (this.blurService.currentBlurState) {
            this.blurStateString = 'active';
            this.blurred = true;
            $('body').css('overflow', 'hidden');
        }
    }
    ngOnDestroy(): void {
        this.dbProjChoiceServiceListener.unsubscribe();
        this.blurServiceListener.unsubscribe();
        this.handleProjectsServiceListener.unsubscribe();
    }
    ngAfterViewInit() {
        this.setScrollDistance();
    }

    private setScrollDistance(): void {
        let BoxH: number = window.innerHeight;
        this.currentWindowHeight = BoxH;
        // console.log('currentWindowHeight: ', this.currentWindowHeight);
    }

    private checkDbProjChoiceService(): void {
        this.dbProjChoiceServiceListener = this.dbProjChoiceService.activeDbProjChoiceStateObservable.subscribe(
            response => {
                if (response) {
                    // console.log('the response for home is: ', response);
                    for (var i = 0; i < response.length; i++) {
                        this.arrayOfProjects[i] = { description: null, href: null, title: null, urlbackground: null, isChecked: null }
                        this.arrayOfProjects[i].description = response[i].description;
                        this.arrayOfProjects[i].href = response[i].href;
                        this.arrayOfProjects[i].title = response[i].title;
                        this.arrayOfProjects[i].urlbackground = response[i].urlbackground;
                        if (i === 0) {
                            this.arrayOfProjects[i].isChecked = true;
                        } else {
                            this.arrayOfProjects[i].isChecked = false;
                        }
                    }
                    // console.log('now the currentProjectIndex is: ', this.currentProjectIndex);
                    this.setProjectBlock(this.currentProjectIndex, this.projectSectionElement);
                    // console.log('set the current project!!!');
                } else {
                    // console.log('no response for the dots');
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
                    this.blurred = true;
                    $('body').css('overflow', 'hidden');
                } else {
                    this.blurStateString = 'inactive';
                    this.blurred = false;
                    $('body').css('overflow', 'initial');
                }
            },
            error => console.log('Error! Description: ' + error)
        );
    }

    private activateSwipeListener(): void {
        $("main").swipe({
            swipe: this.swipeFunction.bind(this),
            threshold: 0,
            fingers: "all"
        });
    }

    private initialiseProjects(): void {
        this.blurred = false;
        this.slideTwice = false;
        this.blurStateString = 'inactive';
        this.currentProjectIndex = 0;
        this.projectSlideBefore = false;
        this.projectSlideAfter = false;
        this.projectDelta = 0;
        this.mov = false;
    }

    private swipeFunction(event: any, direction: string, distance: number, duration: number, fingerCount: number, fingerData: any): void {
        if ((direction === "down") && (this.nextProjectIndex != 0) && !this.mov && !this.blurred) {
            this.handleProjectsService.setProjectsState(this.nextProjectIndex - 1);
        } else if ((direction === "up") && (this.nextProjectIndex != this.arrayOfProjects.length - 1) && !this.mov && !this.blurred) {
            this.handleProjectsService.setProjectsState(this.nextProjectIndex + 1);
        } else return;
    }

    private checkHandleProjectsService(): void {
        this.handleProjectsServiceListener = this.handleProjectsService.projectsStateObservable.subscribe(
            response => {
                this.nextProjectIndex = response;
                this.projectDelta = this.nextProjectIndex - this.currentProjectIndex;
                // console.log('this.currentProjectIndex', this.currentProjectIndex);
                // console.log('this.nextProjectIndex', this.nextProjectIndex);
                // console.log('projectDelta', this.projectDelta);
                if (!this.mov && !this.blurred) {
                    this.mov = true;
                    this.slideProject();
                } else {
                    // console.log('HOME - the screen cannot slide');
                }
            },
            error => console.log('Error! Description: ' + error)
        );
    }

    private slideProject(): void {
        Promise.resolve()
            .then(() => {
                if (this.projectDelta > 0) {
                    this.projectSlideAfter = true;
                } else {
                    this.projectSlideBefore = true;
                }
            })
            .then(() => {
                return new Promise((resolve, reject) => {
                    setTimeout(resolve, 1);
                });
            })
            .then(() => {
                let nextProjectToPass: ElementRef;
                let nextProjectToPassIndex: number;
                if (this.projectDelta > 0) {
                    nextProjectToPass = this.projectSectionAfterElement;
                    nextProjectToPassIndex = this.currentProjectIndex + 1;
                } else {
                    nextProjectToPass = this.projectSectionBeforeElement;
                    nextProjectToPassIndex = this.currentProjectIndex - 1;
                }
                // console.log('this.currentProjectIndex', this.currentProjectIndex);
                // console.log('this.projectDelta', this.projectDelta);
                // console.log('nextProjectToPassIndex', nextProjectToPassIndex);
                // console.log('nextProjectToPass', nextProjectToPass);
                this.setProjectBlock(nextProjectToPassIndex, nextProjectToPass);
            })
            .then(() => {
                return new Promise((resolve, reject) => {
                    setTimeout(resolve, 1);
                });
            })
            .then(() => {
                if (this.projectDelta < 0) {
                    this.setSlideBeforePosition();
                }
            })
            .then(() => {
                return new Promise((resolve, reject) => {
                    setTimeout(resolve, 1);
                });
            })
            .then(() => {
                this.animateSlideProjects(this.trans);
            });

    }
    private setSlideBeforePosition(): void {
        this.renderer.setElementStyle(this.projectSectionBeforeElement.nativeElement, 'top', `${-this.currentWindowHeight}px`);
    }

    private setProjectBlock(currentProjectIndex: number, targetElement: ElementRef): void {
        if (this.arrayOfProjects[currentProjectIndex].isChecked) {
            this.currentProjectDescription = this.arrayOfProjects[currentProjectIndex].description;
            this.currentProjectTitle = this.arrayOfProjects[currentProjectIndex].title;
            this.currentProjectlink = this.arrayOfProjects[currentProjectIndex].href;
        } else {
            if (this.projectDelta < 0) {
                this.beforeProjectDescription = this.arrayOfProjects[currentProjectIndex].description;
                this.beforeProjectTitle = this.arrayOfProjects[currentProjectIndex].title;
                this.beforeProjectlink = this.arrayOfProjects[currentProjectIndex].href;
            } else if (this.projectDelta > 0) {
                this.afterProjectDescription = this.arrayOfProjects[currentProjectIndex].description;
                this.afterProjectTitle = this.arrayOfProjects[currentProjectIndex].title;
                this.afterProjectlink = this.arrayOfProjects[currentProjectIndex].href;
            }
        }
        this.renderer.setElementStyle(targetElement.nativeElement, 'background-image', 'url(' + this.arrayOfProjects[currentProjectIndex].urlbackground + ')');
    }

    private animateSlideProjects(duration: number): void {
        let startingPositionString: string;
        let endingPositionString: string;
        let secondSlideToAnimate: ElementRef;
        const delay: number = 0;
        const animationFunc: string = this.eas;
        if (this.projectDelta > 0) {
            if (duration === 0) {
                startingPositionString = `-${this.currentWindowHeight}0`;
                endingPositionString = `0`;
            } else {
                startingPositionString = `0`;
                endingPositionString = `-${this.currentWindowHeight}`;
            }
            secondSlideToAnimate = this.projectSectionAfterElement;
        } else {
            if (duration === 0) {
                startingPositionString = `${this.currentWindowHeight}`;
                endingPositionString = `0`;
            } else {
                startingPositionString = `0`;
                endingPositionString = `${this.currentWindowHeight}`;
            }
            secondSlideToAnimate = this.projectSectionBeforeElement;
        }
        let animation1: AnimationPlayer;
        animation1 = this.playAnimation(startingPositionString, endingPositionString, secondSlideToAnimate, duration, delay, animationFunc);
        animation1.onDone(() => {
            if (duration !== 0) {
                this.resetAnimationPosition();
            }
        });
    }

    private playAnimation(startingPositionString: string, endingPositionString: string, secondSlideToAnimate: ElementRef, duration: number, delay: number, animationFunc: string): AnimationPlayer {
        const startingStyles: any = {
            styles: [{ 'transform': `translateY(${startingPositionString}px)` }]
        };
        const keyframes: any[] = [
            {
                offset: 1,
                styles: {
                    styles: [
                        { 'transform': `translateY(${endingPositionString}px)` }
                    ]
                }
            }
        ];
        const animation1: AnimationPlayer = this.renderer.animate(this.projectSectionElement.nativeElement,
            startingStyles,
            keyframes,
            duration,
            delay,
            animationFunc);
        animation1.play();
        const animation2: AnimationPlayer = this.renderer.animate(secondSlideToAnimate.nativeElement,
            startingStyles,
            keyframes,
            duration,
            delay,
            animationFunc);
        animation2.play();
        return animation1;
    }

    private resetAnimationPosition(): void {
        Promise.resolve()
            .then(() => {
                this.arrayOfProjects[this.currentProjectIndex].isChecked = false;
                if (this.projectDelta > 0) {
                    this.currentProjectIndex++;
                } else {
                    this.currentProjectIndex--;
                }
                this.arrayOfProjects[this.currentProjectIndex].isChecked = true;
            })
            .then(() => {
                return new Promise((resolve, reject) => {
                    setTimeout(resolve, 1);
                });
            })
            .then(() => {
                this.setProjectBlock(this.currentProjectIndex, this.projectSectionElement);
            })
            .then(() => {
                return new Promise((resolve, reject) => {
                    setTimeout(resolve, 1);
                });
            })
            .then(() => {
                this.animateSlideProjects(0);
            })
            .then(() => {
                return new Promise((resolve, reject) => {
                    setTimeout(resolve, 1);
                });
            })
            .then(() => {
                if (this.projectDelta > 0) {
                    this.projectSlideAfter = false;
                    this.projectDelta--;
                } else if (this.projectDelta < 0) {
                    this.projectSlideBefore = false;
                    this.projectDelta++;
                }
            })
            .then(() => {
                return new Promise((resolve, reject) => {
                    setTimeout(resolve, 1);
                });
            })
            .then(() => {

                if (this.projectDelta != 0) {
                    this.slideProject();
                } else {
                    this.mov = false;
                }
            });
    }
}
