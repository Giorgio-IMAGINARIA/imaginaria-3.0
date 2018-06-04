import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BlurService {
    public currentBlurState: boolean = false;
    public activeBlurStateSubject: Subject<boolean> = new Subject<boolean>();
    public activeBlurStateObservable: Observable<boolean> = this.activeBlurStateSubject.asObservable();
    setBlurState(nextState: boolean): void {
        // console.log('from Imaginaria blurService', nextState);
        this.currentBlurState = nextState;
        this.activeBlurStateSubject.next(nextState);
    }
}