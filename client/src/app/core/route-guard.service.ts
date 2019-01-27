import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { APIService } from './api.service';
import { AuthService } from './auth.service';
import { ProfileDataService } from './profile-data.service';
import { WaitService } from './wait.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {
  
  constructor(private router: Router,
    private apiService: APIService,
    private authService: AuthService,
    private profileDataService: ProfileDataService,
    private waitService: WaitService) {
  }

  canActivate(): Observable<boolean> {
    return new Observable<boolean>((observer) => {

      let canActivatePromise = this.ensureLoggedIn()
        .then(canActivate => {
          if (!canActivate) {
            return Promise.resolve(false);
          }
          return this.profileDataService.loadProfileData();
        });

      this.waitService.wait(canActivatePromise).then(canActivate => {
        if (!canActivate) {
          this.router.navigate(['login']);
        }
        observer.next(canActivate);
        observer.complete();
      });
    });
  }

  private async ensureLoggedIn(): Promise<boolean> {
    const result = await this.authService.init();
    if (!result.success || !this.authService.isAuthenticated) {
      return Promise.resolve(false);
    }
    let needsLogin = !this.authService.profileID;
    let loginPromise = Promise.resolve(true);
    if (needsLogin) {
      loginPromise = this.apiService.loginProfile().then(response => {
        if (!response.success || !response.data) {
          return Promise.resolve(false);
        }
        this.authService.setProfile(response.data);
        return Promise.resolve(true);
      });
    }
    return loginPromise;
  }
}