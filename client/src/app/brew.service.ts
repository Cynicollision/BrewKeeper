import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OperationResponse } from './../../../shared/contracts/OperationResponse';
import { Brew } from './../../../shared/models/Brew';

@Injectable({
  providedIn: 'root'
})
export class BrewService {

  constructor(private http: HttpClient) { 
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

  private buildFailedResponse(error: HttpErrorResponse): OperationResponse<Brew> {
    let message = error.message ? error.message : error;
    return {
      success: false,
      message: `Service error: ${message || ''}`,
    };
  }
}
