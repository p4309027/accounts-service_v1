import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";

import { User } from "./user/user.model";
import {appConfig} from "./app-config";

@Injectable()
export class AppService {
    constructor(private http: Http) {}

    register(user: User) {
        user.role="customer";        
        const body = JSON.stringify(user);
        return this.http.post(appConfig.apiUrl + 'user/register', body, {headers: appConfig.header})
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()));
    }

    login(user: User) {
        const body = JSON.stringify(user);
        return this.http.post(appConfig.apiUrl + 'user/login', body, {headers: appConfig.header})
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()));
    }

    getUserProfile(){
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get(appConfig.apiUrl + 'user/user-profile' + token, {headers: appConfig.header})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                return Observable.throw(error.json());
            });
    }

    updateUserProfile(user: User) {
        user.role = "customer";
        const body = JSON.stringify(user);
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch(appConfig.apiUrl + 'user/user-profile' + token, body, {headers: appConfig.header})
            .map((response: Response) => response.json())
            .catch(error => Observable.throw(error.json()));
    }

    logout() {
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
}