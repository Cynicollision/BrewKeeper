import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Profile } from '../../../../shared/models/Profile';
import { APIService } from '../core/api.service';
import { AuthService } from '../core/auth.service';
import { DialogConfig } from '../core/dialog.service';
import { NotifyService } from '../core/notify.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {

  userName: string;

  get userNameInvalid() {
    return !this.userName;
  }

  constructor(public dialogRef: MatDialogRef<CreateProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public config: DialogConfig<Profile>,
    private apiService: APIService,
    private authService: AuthService,
    private notifyService: NotifyService) { 
  }

  ngOnInit() {
    if (this.config && this.config.data) {
      this.userName = this.config.data.name || '';
    }
  }

  getErrorMessage() {
    return 'User Name is required.';
  }

  close() {
    if (this.userNameInvalid) {
      return;
    }

    this.apiService.registerProfile(this.userName).then(registerResult => {
      if (!registerResult || !registerResult.success) {
        this.notifyService.popError(`Registration failed: ${registerResult.message}`);
      }

      return this.apiService.loginProfile().then(loginResult => {
        this.authService.setProfile(loginResult.data);
        this.dialogRef.close(registerResult);
      });
    });
  }
}
