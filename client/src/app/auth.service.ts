import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { OperationResponse, EmptyOperationResponse } from './../../../shared/contracts/OperationResponse';
import { Profile } from '../../../shared/models/Profile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _idToken = '';
  private _accessToken = '';
  private _expiresAt = 0;
  private _profileID = '';
  private _userName = '';

  // TODO: not hardcoded
  auth0 = new auth0.WebAuth({
    clientID: '2EHHIox2_2t01td8HfxYNpSuEZAVwLpH',
    domain: 'brewkeeper.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid profile'
  });

  constructor(public router: Router, private http: HttpClient) {
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

  get userName(): string {
    return this._userName;
  }

  public login(): void {
    this.auth0.authorize();
  }

  public init(): Promise<Profile> {
    return new Promise<Profile>((resolve, reject) => {

      return this.handleAuthentication().then(() => {
        let next: Promise<Profile> = Promise.resolve(null);

        if (localStorage.getItem('isLoggedIn') === 'true') {
          next = this.renewTokens();
        }

        return next.then(profile => resolve(profile));
      });
    });
  }

  private handleAuthentication(): Promise<Profile> {
    return new Promise<Profile>((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {

        if (authResult && authResult.accessToken && authResult.idToken) {
          window.location.hash = '';
          this.router.navigate(['/']);
          return resolve(this.localLogin(authResult));
        } 
        
        return resolve(null);
      });
    });
  }

  private renewTokens(): Promise<Profile> {
    return new Promise<Profile>((resolve, reject) => {
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

  private localLogin(authResult): Promise<Profile> {
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this._userName = authResult.idTokenPayload.name;

    localStorage.setItem('isLoggedIn', 'true');

    return this.loginProfile(authResult.idTokenPayload.sub)
      .then((response: OperationResponse<Profile>) => {
        if (response.success) {
          this._profileID = response.data.id;
        }
        return response.data;
      });
  }

  public logout(): void {
    this._accessToken = '';
    this._idToken = '';
    this._expiresAt = 0;
    localStorage.removeItem('isLoggedIn');

    this.router.navigate(['/']);
  }

  private loginProfile(externalID: string): Promise<OperationResponse<Profile>> {
    return this.http.post(`http://localhost:3000/login`, { externalID: externalID }).toPromise()
      .then((response: OperationResponse<Profile>) => response)
      .catch(error => {
        return Promise.resolve(this.buildFailedResponse(error.message));
      });
  }

  registerProfile(): void {
    // TODO
  }

  private buildFailedResponse(error: HttpErrorResponse): OperationResponse<Profile> {
    let message = error.message ? error.message : error;
    return {
      success: false,
      message: `Service error: ${message || ''}`,
    };
  }
}
