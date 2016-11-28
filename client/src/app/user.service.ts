import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Router } from '@angular/router';

import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
    
    private loggedIn = false;
    
    constructor(private http: Http, private router: Router)
    {
        //this.loggedIn = !!localStorage.getItem('id_token');
    }
    
    login(email, password)
    {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        let options = new RequestOptions({ headers: headers});
        let body = JSON.stringify({ email: email, password: password });
        
        console.log(body);
        
        return this.http
        .post('https://se3316a-lab5-kpate222.c9users.io:8080/myapi/verifyUser', body, options)
        .map((response: Response) => response.json())
        .map((response) => {
            if (response.message)
            {
                //console.log(response.auth_token);
                //localStorage.setItem('id_token', response.idToken);
                this.loggedIn = true;
            }
            return response.message;
        });
    }
      
    logout()
    {
        //localStorage.removeItem('id_token');
        this.loggedIn = false;
    }
    
    isLoggedIn()
    {
        return this.loggedIn;
    }
}