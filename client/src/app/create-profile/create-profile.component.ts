import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Profile } from '../../../../shared/models/Profile';
import { APIService } from '../core/api.service';
import { DialogConfig } from '../core/dialog.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {

  userName: string;

  constructor(public dialogRef: MatDialogRef<CreateProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public config: DialogConfig<Profile>,
    private apiService: APIService) { 
  }

  ngOnInit() {
    if (this.config && this.config.data) {
      this.userName = this.config.data.name || '';
    }
  }

  close() {
    if (!this.userName || !this.userName.length) {
      // TODO: required fields error
      return;
    }

    this.apiService.registerProfile(this.userName).then(result => {
      if (!result || !result.success) {
        // TODO: present error
        console.log(`Registration failed: ${result.message}`);
      }

      this.dialogRef.close(result);
    });
  }

}
