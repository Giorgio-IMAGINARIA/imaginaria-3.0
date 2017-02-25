import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class HandleProjectsService {
    public currentProjectsState: number = 0;
    public projectsStateSubject: Subject<number> = new Subject<number>();
    public projectsStateObservable: Observable<number> = this.projectsStateSubject.asObservable();
    public setProjectsState(projectState: number): void {
        this.projectsStateSubject.next(projectState);
        this.currentProjectsState = projectState;
    }
}