import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class HandleProjectsService {
    public currentProjectsState: number = 0;
    public projectsStateSubject: Subject<number> = new Subject<number>();
    public projectsStateObservable: Observable<number> = this.projectsStateSubject.asObservable();
    setProjectsState(projectState: number): void {
        console.log('from handleProjectsService: ', projectState);
        this.projectsStateSubject.next(projectState);
        this.currentProjectsState=projectState;
    }
}