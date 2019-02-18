import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { OperationResponse } from '../../../../shared/contracts/OperationResponse';
import { Recipe } from '../../../../shared/models/Recipe';
import { APIService } from '../core/api.service';
import { ConfirmComponent } from '../core/confirm/confirm.component';
import { DialogResult, DialogService } from '../core/dialog.service';
import { ProfileDataService } from '../core/profile-data.service';
import { WaitService } from '../core/wait.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];

  data: Recipe = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private apiService: APIService,
    private dialogService: DialogService,
    private profileDataService: ProfileDataService,
    private waitService: WaitService) {
  }

  private _isNew = false;
  get isNew(): boolean {
    return this._isNew;
  }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe(params => {
      let recipeID = params['id'];
      this._isNew = (recipeID || '0') === '0';

      if (this._isNew) {
        return;
      }

      this.subscriptions.push(this.profileDataService.recipeData.subscribe(recipes => {
        let recipe = recipes.find(b => b.id === recipeID);
        this.data = {...recipe } || {};

        if (!recipe) {
          this.handleError(`Couldn't find data for recipe ID: ${recipeID}`);
          this.router.navigate(['/recipes']);
        }
      }));
   }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  save(): void {
    let savePromise = this.isNew
      ? this.apiService.createRecipe(this.data)
      : this.apiService.updateRecipe(this.data);

    this.waitService.wait(savePromise).then((response: OperationResponse<Recipe>) => {
      if (!response.success) {
        this.handleError(response.message);
        return;
      }
      this.profileDataService.updateRecipe(response.data);
      this.router.navigate(['/recipes']);
    });
  }

  cancel(): void {
    this.router.navigate(['/recipes']);
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
      if (result.data) {
        // TODO
      }
    });
  }

  private handleError(message?: string): void {
    this.snackBar.open(`Something went wrong... ${message || ''}`, 'Error', {
      duration: 5000,
    });
  }
}
