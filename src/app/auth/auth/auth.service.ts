import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {throwError } from 'rxjs';

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient) {}
    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCK_ZBLIDyWL27_a2ux1fzClH6WOdWDntY',
        {
            email: email,
            password: password,
            returnSecureToken: true,
        }).pipe(catchError(error => {
            let errorMessage = 'An error happened';

            if(!error.error || !error.error.error) {
                return throwError(errorMessage);
            }
            switch(error.error.error.message) {
                case 'EMAIL_EXISTS':
                  errorMessage = 'This email already exists';
            }

            return throwError(errorMessage);
        }));
    }
}