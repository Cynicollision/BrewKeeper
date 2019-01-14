import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CreateProfileComponent } from '../create-profile/create-profile.component';
import { DialogConfig, DialogMode, DialogResult, DialogService } from '../dialog.service';
import { Profile } from '../../../../shared/models/Profile';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private _ready = false;
  private _userName: string = null;  

  constructor(public authService: AuthService, private dialogService: DialogService) {
  }

  get ready(): boolean {
    return this._ready;
  }

  get userName(): string {
    return this._userName;
  }
  
  ngOnInit() {
    this.authService.init().then((profile: Profile) => {
      if (profile) {
        this._userName = profile.name;
      }
      else if (this.authService.isAuthenticated) {
        // TOOD: pass logged-in username, if possible
        let config = { mode: DialogMode.edit, data: { name: this.authService.userName } };
        this.dialogService.popDialog(CreateProfileComponent, config).then(result => {

        });
      }
      this._ready = true;
    });
  }
}
