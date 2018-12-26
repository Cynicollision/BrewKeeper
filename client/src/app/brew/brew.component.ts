import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brew',
  templateUrl: './brew.component.html',
  styleUrls: ['./brew.component.scss']
})
export class BrewComponent implements OnInit {
  brewID: string;
  isNewBrew: boolean = true;

  constructor(private route: ActivatedRoute) { ;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.brewID = params.get('id');
      this.isNewBrew = !this.brewID;
    });
  }


}
