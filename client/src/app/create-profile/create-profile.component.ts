import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogConfig, DialogMode, DialogResult } from '../dialog.service';
import { Profile } from '../../../../shared/models/Profile';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {

  userName: string;

  constructor(public dialogRef: MatDialogRef<CreateProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public config: DialogConfig<Profile>,
    private authService: AuthService) { 
  }

  ngOnInit() {
    if (this.config && this.config.data) {
      this.userName = this.config.data.name || '';
    }
  }

  close() {
    if (this.userName || this.userName.length) {
      // TODO: this.authService.registerProfile...
      this.dialogRef.close();
    }
  }

}
