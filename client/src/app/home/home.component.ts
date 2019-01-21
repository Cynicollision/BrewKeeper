import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private _ready = false;
  private _userName: string = null;  

  constructor(public authService: AuthService) {
  }

  get ready(): boolean {
    return this._ready;
  }

  get welcomeMessage(): string {
    if (this._userName) {
      return `Welcome, ${this._userName}`;
    }
    return 'Welcome to Brew Keeper';
  }
  
  ngOnInit() {
    this._userName = this.authService.userName;
    this._ready = true;
  }
}
