import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileSummary } from '../../../../shared/models/Profile';
import { AuthService } from '../core/auth.service';
import { ProfileDataService } from '../core/profile-data.service';

class ProfileStatistic {
  name: string;
  value: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];
  private _userName: string = null;

  public activeBrewCount = 0;
  public hasActiveBrew = true;
  public profileStats: ProfileStatistic[];

  constructor(public authService: AuthService,
    private profileDataService: ProfileDataService) {
  }

  get welcomeMessage(): string {
    if (this._userName) {
      return `Welcome, ${this._userName}`;
    }
    return 'Welcome to Brew Keeper';
  }

  get activeBrewsMessage(): string {
    return `You have ${this.activeBrewCount} active ${this.activeBrewCount === 1 ? 'brew' : 'brews'} in the works.`;
  }
  
  ngOnInit() {
    this._userName = this.authService.userName;

    if (this.profileDataService.profileSummaryData) {
      this.subscriptions.push(this.profileDataService.profileSummaryData.subscribe(summary => {
        this.activeBrewCount = summary.activeBrewCount;
        this.hasActiveBrew = summary.hasActiveBrew;
        this.profileStats = this.getProfileStatistics(summary);
      }));
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private getProfileStatistics(summary: ProfileSummary): ProfileStatistic[] {
    let stats: ProfileStatistic[]  = [];

    stats.push({ name: 'Total brews', value: (summary.brewCount || 0).toString() });
    stats.push({ name: 'Recipe count', value: (summary.recipeCount || 0).toString() });

    if (summary.brewCount) {
      stats.push({ name: 'Brewing since', value: summary.brewingSince });
      stats.push({ name: 'First brew', value: summary.firstBrew.name });

      if (summary.topRecipe) {
        stats.push({ 
          name: 'Most brewed recipe', 
          value: `${summary.topRecipe.name} (${summary.topRecipeBrewedTimes} ${summary.topRecipeBrewedTimes == 1 ? 'time' : 'times'})`,
        });
      }
    }

    return stats;
  }  
}