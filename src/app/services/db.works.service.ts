import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
interface DbWorksPropertiesInterface {
    role: string,
    comPro: string;
    href: string;
    initialTime: string;
    finalTime: string;
    amount: string;
    city: string;
    country: string;
    description: string;
}
@Injectable()
export class DbWorksService {
    public currentDbWorksState: Array<DbWorksPropertiesInterface> = null;
    public activeDbWorksStateSubject: Subject<Array<DbWorksPropertiesInterface>> = new Subject<Array<DbWorksPropertiesInterface>>();
    public activeDbWorksStateObservable: Observable<Array<DbWorksPropertiesInterface>> = this.activeDbWorksStateSubject.asObservable();
    constructor(private http: Http) { }

    private setDbWorksState(nextState: Array<DbWorksPropertiesInterface>): void {
        // console.log('from Imaginaria DbWorksService', nextState);
        this.currentDbWorksState = nextState;
        this.activeDbWorksStateSubject.next(nextState);
    }

    sendRequest(): void {
        this.http.get('/db/works').subscribe((data: Response) => {
            try {
                this.setDbWorksState(data.json().worksDBArray);
            }
            catch (err) {
                console.log(err);
            }
        });
    }

}