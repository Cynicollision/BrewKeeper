import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Brew } from '../../../shared/models/Brew';
import { Recipe } from '../../../shared/models/Recipe';
import { ProfileData } from '../../../shared/models/ProfileData';

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

  init(data: ProfileData){
    this._initialized = true;
    this._brewDataSource.next(data.brews);
    this._recipeDataSource.next(data.recipes);
  }

  updateBrews(newCollection: Brew[]): void {
    this._brewDataSource.next(newCollection);
  }

  updateRecipes(newCollection: Recipe[]): void {
    this._recipeDataSource.next(newCollection);
  }
}
