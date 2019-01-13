import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';

export class UserInfo {
  name: string = "";
  id: string = "";
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _idToken = '';
  private _accessToken = '';
  private _expiresAt = 0;
  private _userInfo = null;

  // TODO: not hardcoded
  auth0 = new auth0.WebAuth({
    clientID: '2EHHIox2_2t01td8HfxYNpSuEZAVwLpH',
    domain: 'brewkeeper.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid profile'
  });

  constructor(public router: Router) {
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  get isAuthenticated(): boolean {
    return new Date().getTime() < this._expiresAt;
  }

  public login(): void {
    this.auth0.authorize();
  }

  public init(): Promise<UserInfo> {
    return new Promise<UserInfo>((resolve, reject) => {

      return this.handleAuthentication().then(() => {
        let next: Promise<UserInfo> = Promise.resolve(null);

        if (localStorage.getItem('isLoggedIn') === 'true') {
          next = this.renewTokens();
        }

        return next.then(userInfo => resolve(userInfo));
      });
    });
  }

  private handleAuthentication(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {

        if (authResult && authResult.accessToken && authResult.idToken) {
          window.location.hash = '';
          this.localLogin(authResult);
        } 
        else if (err) {
          console.log(err);
        }
        this.router.navigate(['/']);
        return resolve();
      });
    });
  }

  private renewTokens(): Promise<UserInfo> {
    return new Promise<UserInfo>((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {

        if (authResult && authResult.accessToken && authResult.idToken) {
          return resolve(this.localLogin(authResult));
        } 
        else if (err) {
          console.log(`Could not get a new token (${err.error}: ${err.error_description}).`);
          this.logout();
        }
        return resolve(null);
      });
    });
    
  }

  private localLogin(authResult): UserInfo {
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();

    localStorage.setItem('isLoggedIn', 'true');

    return {
      name: authResult.idTokenPayload.name,
      id: this._idToken,
    };
  }

  public logout(): void {
    this._accessToken = '';
    this._idToken = '';
    this._expiresAt = 0;
    localStorage.removeItem('isLoggedIn');

    this.router.navigate(['/']);
  }

  
}
