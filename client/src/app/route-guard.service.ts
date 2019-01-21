import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private router: Router, 
    public authService: AuthService, 
    private apiService: APIService) {
  }

  canActivate(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.authService.init().then(result => {
        if (!this.authService.isAuthenticated) {
          this.router.navigate(['login']);
          return Promise.resolve(false);
        }

        // TODO: check to see if we need to login
        return this.apiService.loginProfile().then(response => {
          if (response.success && response.data) {
            this.authService.setProfile(response.data);
            return Promise.resolve(true);
          }
          this.router.navigate(['login']);
          return Promise.resolve(false);
        });
      })
      .then(success => {
        observer.next(success);
        observer.complete();
      });
    });
  }
}