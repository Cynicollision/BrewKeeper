import { Component, OnInit, OnDestroy } from '@angular/core';
import { Brew } from './../../../../shared/models/Brew';
import { ListItem } from './../core/list/list.component';
import { NavigationService, Navigable } from '../core/navigation.service';
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
    private navigationService: NavigationService,
    private profileDataService: ProfileDataService) { 
  }

  ngOnInit() {
    this.brews = [];

    let sub = this.profileDataService.brewData.subscribe(brews => {
      this.brews = brews.map(brew => this.mapBrewToListItem(brew))
        .sort((a, b) => new Date(b.data.brewDate).getTime() - new Date(a.data.brewDate).getTime());
    });

    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private mapBrewToListItem(brew: Brew): ListItem {
    return { id: brew.id, name: brew.name, data: brew, description: brew.brewDate ? brew.brewDate.toString() : 'Not started yet' };
  }

  viewBrew(brewID: string): void {
    this.navigationService.goToResource(Navigable.BrewDetail, brewID);
  }
}
