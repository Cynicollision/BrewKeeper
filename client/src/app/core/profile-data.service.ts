import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Brew } from '../../../../shared/models/Brew';
import { Recipe } from '../../../../shared/models/Recipe';
import { ProfileData } from '../../../../shared/models/ProfileData';
import { APIService } from './api.service';
import { AuthService } from './auth.service';
import { OperationResponse } from '../../../../shared/contracts/OperationResponse';

@Injectable({
  providedIn: 'root'
})
export class ProfileDataService {
  private _initialized = false;

  private _brewDataSource = new BehaviorSubject<Brew[]>([]);
  brewData = this._brewDataSource.asObservable();

  private _recipeDataSource = new BehaviorSubject<Recipe[]>([]);
  recipeData = this._recipeDataSource.asObservable();

  get isInitialized(): boolean {
    return this._initialized;
  }

  constructor(private apiService: APIService, private authService: AuthService) {
  }

  private init(data: ProfileData){
    this._initialized = true;
    this._brewDataSource.next(data.brews);
    this._recipeDataSource.next(data.recipes);
  }

  createBrew(newBrew: Brew): Promise<OperationResponse<Brew>> {
    return this.apiService.createBrew(newBrew).then(response => {
      if (response.success) {
        let newCollection = this._brewDataSource.value.concat(response.data);
        this._brewDataSource.next(newCollection);
      }
      return response;
    });
  }

  updateBrew(updatedBrew: Brew): Promise<OperationResponse<Brew>> {
    return this.apiService.updateBrew(updatedBrew).then(response => {

      if (response.success) {
        let newCollection: Brew[] = this._brewDataSource.value
          .map(brew => brew.id === updatedBrew.id ? updatedBrew : brew);
          
        this._brewDataSource.next(newCollection);
      }

      return response;
    });
  }

  deleteBrew(brewID: string): Promise<OperationResponse<Brew>> {
    return this.apiService.deleteBrew(brewID).then(response => {
      if (response.success) {
        let newCollection: Brew[] = [];
        this._brewDataSource.value.forEach(brew => {
          if (brew.id !== brewID) {
            newCollection.push(brew);
          }
        });
    
        this._brewDataSource.next(newCollection);
      }
      return response;
    });
  }

  createRecipe(newRecipe: Recipe): Promise<OperationResponse<Recipe>> {
    return this.apiService.createRecipe(newRecipe).then(response => {
      if (response.success) {
        let newCollection = this._recipeDataSource.value.concat(response.data);
        this._recipeDataSource.next(newCollection);
      }
      return response;
    });
  }

  updateRecipe(updatedRecipe: Recipe): Promise<OperationResponse<Recipe>> {
    return this.apiService.updateRecipe(updatedRecipe).then(response => {

      if (response.success) {
        let newCollection: Recipe[] = this._recipeDataSource.value
          .map(recipe => recipe.id === updatedRecipe.id ? updatedRecipe : recipe);
          
        this._recipeDataSource.next(newCollection);
      }

      return response;
    });
  }

  deleteRecipe(recipeID: string): Promise<OperationResponse<Recipe>> {
    return this.apiService.deleteRecipe(recipeID).then(response => {
      if (response.success) {
        let newCollection: Recipe[] = [];
        this._recipeDataSource.value.forEach(recipe => {
          if (recipe.id !== recipeID) {
            newCollection.push(recipe);
          }
        });
    
        this._recipeDataSource.next(newCollection);
      }
      return response;
    });
  }

  loadProfileData(): Promise<boolean> {
    let needsProfileData = !this.isInitialized;
    let loadPromise = Promise.resolve(true);

    if (needsProfileData) {
      loadPromise = this.apiService.getProfileData(this.authService.profileID).then(response => {
        if (!response.success || !response.data) {
          return Promise.resolve(false);
        }
        this.init(response.data);
        return Promise.resolve(true);
      });
    }
    return loadPromise;
  }
}
