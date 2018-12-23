import { Component, OnInit, Input } from '@angular/core';
import { Brew } from './../../../../shared/models/Brew';

export interface ListItem {
  name: string;
}


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input()
  collection: ListItem[];


  constructor() { }

  ngOnInit() {
  }
}
