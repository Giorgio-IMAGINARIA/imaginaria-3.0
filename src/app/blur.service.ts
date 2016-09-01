import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BlurService {
    public initialBlurState: boolean = false;
    public activeBlurStateSubject: Subject<boolean> = new Subject<boolean>();
    public activeBlurStateObservable: Observable<boolean> = this.activeBlurStateSubject.asObservable();
    setBlurState(nextState: boolean): void {
        this.activeBlurStateSubject.next(nextState);
    }
}