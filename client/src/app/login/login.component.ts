import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { APIService } from '../core/api.service';
import { DialogService } from '../core/dialog.service';
import { CreateProfileComponent } from './../create-profile/create-profile.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
    public authService: AuthService, 
    private apiService: APIService, 
    private dialogService: DialogService) { }

  ngOnInit() {
    if (this.authService.isAuthenticated) {

      if (this.authService.hasProfile) {
        this.router.navigate(['/']);
        return;
      }

      let config = { data: { name: this.authService.userName } };
      return this.dialogService.popDialog(CreateProfileComponent, config).then(result => {
        if (result.success) {
          this.router.navigate['/'];
        }
        else if (result.cancelled) {
          // TODO
          console.log('Registration was cancelled.');
        }
      });
    }
  }
}
