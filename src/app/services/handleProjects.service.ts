import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class HandleProjectsService {
    public projectsStateSubject: Subject<boolean> = new Subject<boolean>();
    public projectsStateObservable: Observable<boolean> = this.projectsStateSubject.asObservable();
    setProjectsState(nextState: boolean): void {
        console.log('from handleProjectsService', nextState);
        this.projectsStateSubject.next(nextState);
    }
}