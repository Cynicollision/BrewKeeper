import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { OperationResponse } from '../../../shared/contracts/OperationResponse';
import { Brew } from '../../../shared/models/Brew';
import { Profile } from '../../../shared/models/Profile';
import { ProfileData } from '../../../shared/models/ProfileData';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient, private authService: AuthService) { 
  }

  createBrew(brew: Brew): Promise<OperationResponse<Brew>> {
    brew.ownerProfileID = this.authService.profileID;
    return this.makePOST(`${environment.apiBaseURI}/brew`, brew);
  }

  updateBrew(brew: Brew): Promise<OperationResponse<Brew>> {
    brew.ownerProfileID = this.authService.profileID;
    return this.makePOST(`${environment.apiBaseURI}/brew/${brew.id}`, brew);
  }

  loginProfile(): Promise<OperationResponse<Profile>> {
    return this.makePOST<Profile>(`${environment.apiBaseURI}/login`);
  }

  registerProfile(name: string): Promise<OperationResponse<Profile>> {
    let registration = { 
      name: name,
    };
    return this.makePOST(`${environment.apiBaseURI}/register`, registration);
  }

  getProfileData(profileID: string): Promise<OperationResponse<ProfileData>> {
    return this.makeGET(`${environment.apiBaseURI}/profile-data?id=${profileID}`);
  }

  private makeGET<T>(url: string): Promise<OperationResponse<T>> {
    return this.http.get(url, this.getHttpOptions()).toPromise()
      .then((response: OperationResponse<T>) => response)
      .catch(error => {
        return Promise.resolve(this.buildFailedResponse(error.message));
      });
  }

  private makePOST<T>(url: string, body?: any): Promise<OperationResponse<T>> {
    return this.http.post(url, body, this.getHttpOptions()).toPromise()
      .then((response: OperationResponse<T>) => response)
      .catch(error => Promise.resolve(this.buildFailedResponse(error.message)));
  }

  private getHttpOptions(): object {
    return {
      headers: {
        'Authorization': `Bearer ${this.authService.idToken}`,
      }
    };
  };

  private buildFailedResponse<T>(error: HttpErrorResponse): OperationResponse<T> {
    let message = error.message ? error.message : error;
    return {
      success: false,
      message: `Service error: ${message || ''}`,
    };
  }
}
