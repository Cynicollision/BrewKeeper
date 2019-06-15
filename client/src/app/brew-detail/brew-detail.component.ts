import { Component, OnInit } from '@angular/core';
import { OperationResponse } from '../../../../shared/contracts/OperationResponse';
import { Brew } from '../../../../shared/models/Brew';
import { Recipe } from '../../../../shared/models/Recipe';
import { ConfirmComponent } from '../core/confirm/confirm.component';
import { DialogResult, DialogService } from '../core/dialog.service';
import { ProfileDataService } from '../core/profile-data.service';
import { NavigationService, Navigable } from '../core/navigation.service';
import { NotifyService } from '../core/notify.service';
import { WaitService } from '../core/wait.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brew-detail',
  templateUrl: './brew-detail.component.html',
  styleUrls: ['./brew-detail.component.scss']
})
export class BrewDetailComponent implements OnInit {
  data: Brew = {};
  recipes: Recipe[] = [];

  constructor(
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private navigationService: NavigationService,
    private notifyService: NotifyService,
    private profileDataService: ProfileDataService,
    private waitService: WaitService) {
  }

  private _isNew = false;
  get isNew(): boolean {
    return this._isNew;
  }

  get noRecipes(): boolean {
    return !this.recipes.length;
  }

  ngOnInit() {
    let subs = [];

    subs.push(this.route.params.subscribe(params => {
      let brewID = params['id'];
      this._isNew = (brewID || '0') === '0';

      if (this._isNew) {
        return;
      }

      subs.push(this.profileDataService.brewData.subscribe(brews => {
        let brew = brews.find(b => b.id === brewID);
        this.data = {...brew } || {};

        if (!brew) {
          this.notifyService.popError(`Couldn't find data for brew ID: ${brewID}`);
          this.navigationService.goTo(Navigable.BrewList);
          return;
        }

        this.data.brewDate = this.parseDate(this.data.brewDate);
        this.data.bottleDate = this.parseDate(this.data.bottleDate);
        this.data.chillDate = this.parseDate(this.data.chillDate);
      }));
    }));

    subs.push(this.profileDataService.recipeData.subscribe(recipes => {
      this.recipes = recipes.sort((a, b) => b.name > a.name ? -1 : 1);
    }));

    subs.forEach(sub => sub.unsubscribe());
  }

  save(): void {
    this.data.brewDate = this.formatDate(this.data.brewDate);
    this.data.bottleDate = this.formatDate(this.data.bottleDate);
    this.data.chillDate = this.formatDate(this.data.chillDate);

    let savePromise = this.isNew
      ? this.profileDataService.createBrew(this.data)
      : this.profileDataService.updateBrew(this.data);

    this.waitService.wait(savePromise).then((response: OperationResponse<Brew>) => {
      if (!response.success) {
        this.notifyService.popError(response.message);
        return;
      }
      this.notifyService.popSuccess('Brew saved.');
      this.navigationService.goTo(Navigable.BrewList);
    });
  }

  private parseDate(dateString: string): string {
    return dateString ? <any>new Date(dateString) : null;
  }

  private formatDate(dateString: string): string {
    return dateString ? new Date(dateString).toDateString() : null;
  }

  delete(): void {
    this.dialogService.popDialog(ConfirmComponent, { 
      data: { 
        message: 'Permenantly delete this brew?',
        confirm: 'Yes, delete',
        cancel: 'Cancel',
      },
    })
    .then((result: DialogResult<boolean>) => {
      if (result.data === true) {
        
        return this.waitService.wait(this.profileDataService.deleteBrew(this.data.id))
          .then(response => {
            this.navigationService.goTo(Navigable.BrewList);
          });
      }
    });
  }

  cancel(): void {
    this.navigationService.goTo(Navigable.BrewList);
  }
}
