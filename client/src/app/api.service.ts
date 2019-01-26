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

  createBrew(brew: Brew): Promise<OperationResponse<Brew>> {
    brew.ownerProfileID = this.authService.profileID;
    return this.makePOST(`http://localhost:3000/api/brew`, brew);
  }

  updateBrew(brew: Brew): Promise<OperationResponse<Brew>> {
    return this.makePOST(`http://localhost:3000/api/brew/${brew.id}`, brew);
  }

  // getBrew(brewID: string): Promise<OperationResponse<Brew>> {
  //   return this.makeGET(`http://localhost:3000/api/brew?id=${brewID}`);
  // }

  // getBrewsForLoggedInUser(profileID: string): Promise<OperationResponse<Brew[]>> {
  //   return this.makePOST('http://localhost:3000/api/<todo>', { profileID: profileID });
  // }

  loginProfile(): Promise<OperationResponse<Profile>> {
    return this.makePOST<Profile>('http://localhost:3000/api/login');
  }

  registerProfile(name: string): Promise<OperationResponse<Profile>> {
    let registration = { 
      name: name,
    };
    return this.makePOST('http://localhost:3000/api/register', registration);
  }

  private makeGET<T>(url: string): Promise<OperationResponse<T>> {
    return this.http.get(url).toPromise()
      .then((response: OperationResponse<T>) => response)
      .catch(error => {
        return Promise.resolve(this.buildFailedResponse(error.message));
      });
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
