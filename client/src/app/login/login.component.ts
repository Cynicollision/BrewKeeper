import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { APIService } from '../api.service';
import { DialogMode, DialogService } from '../dialog.service';
import { CreateProfileComponent } from './../create-profile/create-profile.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
    private authService: AuthService, 
    private apiService: APIService, 
    private dialogService: DialogService) { }

  ngOnInit() {
    //this.authService.init().then(result => {
      // if (!result.success) {
      //   console.log(`Auth error: ${result.message}`);
      //   return Promise.resolve();
      // }

      if (this.authService.isAuthenticated) {
        return this.apiService.loginProfile().then(response => {
          if (response.success && response.data) {
            this.router.navigate(['']);
            return Promise.resolve();
          }
          else {
            let config = { mode: DialogMode.edit, data: { name: this.authService.userName } };
            return this.dialogService.popDialog(CreateProfileComponent, config).then(result => {
              if (result.success) {
                // TODO: component?
                alert('Thanks for registering!');
              }
              else if (result.cancelled) {
                console.log('Registration was cancelled.');
              }
            });
          }
        });
      }
    //});
  }
}
