import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { OperationResponse } from '../../../shared/contracts/OperationResponse';
import { Brew } from '../../../shared/models/Brew';
import { Profile } from '../../../shared/models/Profile';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient, private authService: AuthService) { 
  }

  create(brew: Brew): Promise<OperationResponse<Brew>> {
    return this.http.post(`http://localhost:3000/api/brew`, brew).toPromise()
      .then((response: OperationResponse<Brew>) => response)
      .catch(error => {
        return Promise.resolve(this.buildFailedResponse(error));
      });
  }

  update(brew: Brew): Promise<OperationResponse<Brew>> {
    return this.http.post(`http://localhost:3000/api/brew/${brew.id}`, brew).toPromise()
      .then((response: OperationResponse<Brew>) => response)
      .catch(error => {
        return Promise.resolve(this.buildFailedResponse(error));
      });
  }

  get(brewID: string): Promise<OperationResponse<Brew>> {
    return this.http.get(`http://localhost:3000/api/brew?id=${brewID}`).toPromise()
      .then((response: OperationResponse<Brew>) => response)
      .catch(error => {
        return Promise.resolve(this.buildFailedResponse(error.message));
      });
  }

  getBrewsForLoggedInUser(profileID: string): Promise<OperationResponse<Brew[]>> {
    return this.makePOST('http://localhost:3000/api/<todo>', { profileID: profileID });
  }

  loginProfile(): Promise<OperationResponse<Profile>> {
    return this.makePOST('http://localhost:3000/login');
  }

  registerProfile(userName: string): Promise<OperationResponse<Profile>> {
    let registration = { 
      userName: userName,
    };
    return this.makePOST('http://localhost:3000/register', registration);
  }

  private makePOST<T>(url: string, body?: any): Promise<OperationResponse<T>> {
    let options = {
      headers: {
        'Authorization': `Bearer ${this.authService.idToken}`,
      },
    };
    return this.http.post(url, body, options).toPromise()
      .then((response: OperationResponse<T>) => response)
      .catch(error => Promise.resolve(this.buildFailedResponse(error.message)));
  }

  private buildFailedResponse<T>(error: HttpErrorResponse): OperationResponse<T> {
    let message = error.message ? error.message : error;
    return {
      success: false,
      message: `Service error: ${message || ''}`,
    };
  }
}
