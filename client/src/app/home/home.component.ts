import { Component, OnInit } from '@angular/core';
import { AuthService, UserInfo } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private _ready = false;
  private _userInfo: UserInfo = null;  

  constructor(public authService: AuthService) {
  }

  get ready(): boolean {
    return this._ready;
  }

  get userName(): string {
    return this._userInfo ? this._userInfo.name : '';
  }

  ngOnInit() {
    this.authService.init().then((userInfo: UserInfo) => {
      this._userInfo = userInfo;
      this._ready = true;
    });
  }
}
