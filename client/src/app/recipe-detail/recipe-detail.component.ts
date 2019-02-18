import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OperationResponse } from '../../../../shared/contracts/OperationResponse';
import { Recipe } from '../../../../shared/models/Recipe';
import { ConfirmComponent } from '../core/confirm/confirm.component';
import { DialogResult, DialogService } from '../core/dialog.service';
import { ProfileDataService } from '../core/profile-data.service';
import { NavigationService, Navigable } from '../core/navigation.service';
import { NotifyService } from '../core/notify.service';
import { WaitService } from '../core/wait.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  data: Recipe = {};

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

  ngOnInit() {
    let subs = [];

    subs.push(this.route.params.subscribe(params => {
      let recipeID = params['id'];
      this._isNew = (recipeID || '0') === '0';

      if (this._isNew) {
        return;
      }

      subs.push(this.profileDataService.recipeData.subscribe(recipes => {
        let recipe = recipes.find(b => b.id === recipeID);
        this.data = {...recipe } || {};

        if (!recipe) {
          this.notifyService.popError(`Couldn't find data for recipe ID: ${recipeID}`);
          this.navigationService.goTo(Navigable.RecipeList);
        }
      }));
    }));

    subs.forEach(sub => sub.unsubscribe());
  }

  save(): void {
    let savePromise = this.isNew
      ? this.profileDataService.createRecipe(this.data)
      : this.profileDataService.updateRecipe(this.data);

    this.waitService.wait(savePromise).then((response: OperationResponse<Recipe>) => {
      if (!response.success) {
        this.notifyService.popError(response.message);
        return;
      }
      this.notifyService.popSuccess('Recipe saved.');
      this.navigationService.goTo(Navigable.RecipeList);
    });
  }

  delete(): void {
    this.dialogService.popDialog(ConfirmComponent, { 
      data: { 
        message: 'Permenantly delete this recipe?',
        confirm: 'Yes, delete',
        cancel: 'Cancel',
      },
    })
    .then((result: DialogResult<boolean>) => {
      if (result.data === true) {
        
        return this.waitService.wait(this.profileDataService.deleteRecipe(this.data.id))
          .then(response => {
            this.navigationService.goTo(Navigable.RecipeList);
          });
      }
    });
  }

  cancel(): void {
    this.navigationService.goTo(Navigable.RecipeList);
  }
}
