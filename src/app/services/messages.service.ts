import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class MessagesService {
    constructor(private http: Http) { }

    sendNew(details: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let stringifiedDetailsObject = JSON.stringify(details);
        console.log('stringifiedDetailsObject: ', stringifiedDetailsObject);
        console.log('window.location.origin', window.location.origin);
        let windowLocOrigin: string = window.location.origin;
        this.http.post(window.location.origin+'/sendmail', stringifiedDetailsObject, { headers: headers }).subscribe((data) => {
            console.log(data);
            if (data.json().success) {
                console.log('Sent successfully');
            }
        })
    }

}
