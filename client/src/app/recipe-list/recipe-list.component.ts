import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from './../../../../shared/models/Recipe';
import { ListItem } from './../core/list/list.component';
import { NavigationService, Navigable } from '../core/navigation.service';
import { ProfileDataService } from '../core/profile-data.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];
  public recipes: ListItem[];
  public noRecipes = false;

  constructor(
    private navigationService: NavigationService,
    private profileDataService: ProfileDataService) { 
  }

  ngOnInit() {
    this.recipes = [];

    let sub = this.profileDataService.recipeData.subscribe(recipes => {
      this.recipes = recipes.map(recipe => this.mapRecipeToListItem(recipe))
        .sort((a, b) => b.name > a.name ? -1 : 1);

      this.noRecipes = !this.recipes.length;
    });

    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private mapRecipeToListItem(brew: Recipe): ListItem {
    return { id: brew.id, name: brew.name };
  }

  viewRecipe(recipeID: string): void {
    this.navigationService.goToResource(Navigable.RecipeDetail, recipeID);
  }
}
