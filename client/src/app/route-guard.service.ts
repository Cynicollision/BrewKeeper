import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { APIService } from './api.service';
import { AuthService } from './auth.service';
import { ProfileDataService } from './profile-data.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private router: Router,
    private apiService: APIService,
    private authService: AuthService, 
    private profileDataService: ProfileDataService) {
  }

  canActivate(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.ensureLoggedIn().then(canActivate => {
        if (!canActivate) {
          return Promise.resolve(false);
        }
        return this.loadProfileData();
      })
      .then(canActivate => {
        if (!canActivate) {
          this.router.navigate(['login']);
        }
        observer.next(canActivate);
        observer.complete();
      });
    });
  }

  private ensureLoggedIn(): Promise<boolean> {
    return this.authService.init().then(result => {
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
    });
  }

  private loadProfileData(): Promise<boolean> {
    let needsProfileData = !this.profileDataService.isInitialized;
    let loadPromise = Promise.resolve(true);

    if (needsProfileData) {
      loadPromise = this.apiService.getProfileData(this.authService.profileID).then(response => {
        if (!response.success || !response.data) {
          return Promise.resolve(false);
        }
        this.profileDataService.init(response.data);
        return Promise.resolve(true);
      });
    }
    return loadPromise;
  }
}