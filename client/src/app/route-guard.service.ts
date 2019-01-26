import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { APIService } from './api.service';
import { AuthService } from './auth.service';
import { DialogService, DialogMode } from './dialog.service';
import { ProfileDataService } from './profile-data.service';
import { WaitComponent } from './core/wait/wait.component';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  // threshold in milliseconds to wait before showing the "wait" spinner
  private readonly WaitThreshold = 500;

  constructor(private router: Router,
    private apiService: APIService,
    private authService: AuthService,
    private dialogService: DialogService,
    private profileDataService: ProfileDataService) {
  }

  canActivate(): Observable<boolean> {
    return new Observable<boolean>((observer) => {

      let canActivatePromise = this.ensureLoggedIn()
        .then(canActivate => {
          if (!canActivate) {
            return Promise.resolve(false);
          }
          return this.loadProfileData();
        });

      this.wait(canActivatePromise).then(canActivate => {
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

  private wait<T>(waitingOn: Promise<T>): Promise<T> {
    
    return new Promise((resolve, reject) => {
      let waitingOnComplete = false;
      let wrappingPromise = Promise.resolve<any>(null);

      waitingOn.then(result => {
        waitingOnComplete = true;
        this.dialogService.closeCurrentDialog();
        wrappingPromise.then(() => resolve(result));
      });

      setTimeout(() => {
        if (!waitingOnComplete) {
          wrappingPromise = this.dialogService.popDialog(WaitComponent, { mode: DialogMode.view, preventClose: true });
        }
      }, 10);
    });
  }
}