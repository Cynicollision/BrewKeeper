import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Brew } from './../../../../shared/models/Brew';
import { ListItem } from './../core/list/list.component';
import { ProfileDataService } from '../core/profile-data.service';

@Component({
  selector: 'app-brew-list',
  templateUrl: './brew-list.component.html',
  styleUrls: ['./brew-list.component.scss']
})
export class BrewListComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];
  public brews: ListItem[];

  constructor(
    private router: Router,
    private profileDataService: ProfileDataService) { 
  }

  ngOnInit() {
    this.brews = [];

    let sub = this.profileDataService.brewData.subscribe(brews => {
      this.brews = brews.map(brew => this.mapBrewToListItem(brew));
    });

    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private mapBrewToListItem(brew: Brew): ListItem {
    return { id: brew.id, name: brew.name };
  }

  viewBrew(brewID: string): void {
    this.router.navigate(['/brew', brewID]);
  }
}
