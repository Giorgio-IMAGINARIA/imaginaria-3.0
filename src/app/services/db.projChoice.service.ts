import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// MODELS
import { DbProjChoice } from '../models/dbProjChoice';

interface DbProjChoicePropertiesInterface {
    description: string,
    href: string
    title: string,
    urlbackground: string
}
@Injectable()
export class DbProjChoiceService {
    public currentDbProjChoiceState: Array<DbProjChoicePropertiesInterface> = null;
    public activeDbProjChoiceStateSubject: Subject<Array<DbProjChoicePropertiesInterface>> = new Subject<Array<DbProjChoicePropertiesInterface>>();
    public activeDbProjChoiceStateObservable: Observable<Array<DbProjChoicePropertiesInterface>> = this.activeDbProjChoiceStateSubject.asObservable();
    constructor(private http: Http) { }

    private setDbProjChoiceState(nextState: Array<DbProjChoicePropertiesInterface>): void {
        console.log('nextState: ', nextState);
        this.currentDbProjChoiceState = nextState;
        this.activeDbProjChoiceStateSubject.next(nextState);
    }

    sendRequest(): void {
        console.log('send DB request projChoice: ', DbProjChoice);
        setTimeout(() => {
            this.setDbProjChoiceState(DbProjChoice.projectDBArray);
        }, 1);



        // this.http.get('/db/works').subscribe((data: Response) => {
        //     try {
        //         this.setDbWorksState(data.json().worksDBArray);
        //     }
        //     catch (err) {
        //         console.log(err);
        //     }
        // });
    }

}