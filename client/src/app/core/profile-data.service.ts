import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Brew } from '../../../../shared/models/Brew';
import { Recipe } from '../../../../shared/models/Recipe';
import { ProfileData } from '../../../../shared/models/ProfileData';
import { APIService } from './api.service';
import { AuthService } from './auth.service';

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

  updateBrew(updatedBrew: Brew): void {
    let updated = false;
    let newCollection: Brew[] = this._brewDataSource.value.map(brew => {
      if (brew.id === updatedBrew.id) {
        updated = true;
        return updatedBrew;
      }
      return brew;
    });
    
    if (!updated) {
      newCollection.push(updatedBrew);
    }

    this._brewDataSource.next(newCollection);
  }

  updateBrews(newCollection: Brew[]): void {
    this._brewDataSource.next(newCollection);
  }

  updateRecipes(newCollection: Recipe[]): void {
    this._recipeDataSource.next(newCollection);
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
