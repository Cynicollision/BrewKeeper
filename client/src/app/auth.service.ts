import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';

export interface AuthResult {
  success: boolean;
  message?: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _idToken = '';
  // private _accessToken = '';
  private _expiresAt = 0;
  private _profileID = '';
  private _userName = '';

  // TODO: not hardcoded
  auth0 = new auth0.WebAuth({
    clientID: '2EHHIox2_2t01td8HfxYNpSuEZAVwLpH',
    domain: 'brewkeeper.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'https://brewkeeper.herokuapp.com/callback',
    scope: 'openid profile'
  });

  constructor(public router: Router) {
  }

  // get accessToken(): string {
  //   return this._accessToken;
  // }

  get idToken(): string {
    return this._idToken;
  }

  get isAuthenticated(): boolean {
    return new Date().getTime() < this._expiresAt;
  }

  get profileID(): string {
    return this._profileID;
  }

  get userName(): string {
    return this._userName;
  }

  public login(): void {
    this.auth0.authorize();
  }

  public init(): Promise<AuthResult> {
    return new Promise<AuthResult>((resolve, reject) => {

      return this.handleAuthentication().then(() => {
        let next: Promise<AuthResult> = Promise.resolve({ success: false, message: 'No client logged in.' });

        if (localStorage.getItem('isLoggedIn') === 'true') {
          next = this.renewTokens();
        }

        return next.then(result => resolve(result));
      });
    });
  }

  private handleAuthentication(): Promise<AuthResult> {
    return new Promise<AuthResult>((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {

        if (authResult && authResult.accessToken && authResult.idToken) {
          window.location.hash = '';
          this.router.navigate(['/']);
          return resolve(this.localLogin(authResult));
        } 
        
        return resolve({ success: false, message: `Unknown error.` });
      });
    });
  }

  private renewTokens(): Promise<AuthResult> {
    return new Promise<AuthResult>((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {

        if (authResult && authResult.accessToken && authResult.idToken) {
          return resolve(this.localLogin(authResult));
        }
        err = err || {};
        this.logout();
        return resolve({ success: false, message: `Could not get a new token (${err.error}: ${err.error_description}).` });
      });
    });
    
  }

  private localLogin(authResult): AuthResult {
    this._idToken = authResult.idToken;
    this._expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();

    localStorage.setItem('isLoggedIn', 'true');

    return { success: true };

    // return this.loginProfile()
    //   .then((response: OperationResponse<Profile>) => {
    //     if (response.success) {
    //       this._profileID = response.data.id;
    //       this._userName = response.data.name;
    //     }
    //     return response.data;
    //   });
  }

  public logout(): void {
    this._idToken = '';
    this._expiresAt = 0;
    localStorage.removeItem('isLoggedIn');

    this.router.navigate(['/']);
  }
}
