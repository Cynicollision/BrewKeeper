import { Component, OnInit } from '@angular/core';
import { ListItem } from './../list/list.component';

@Component({
  selector: 'app-brew-list',
  templateUrl: './brew-list.component.html',
  styleUrls: ['./brew-list.component.scss']
})
export class BrewListComponent implements OnInit {

  brews: ListItem[];
  constructor() { }

  ngOnInit() {
    this.brews = [];
    this.brews.push({ name: 'IPA' });
    this.brews.push({ name: 'Porter' });
  }

}
