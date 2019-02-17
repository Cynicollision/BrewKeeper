import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Recipe } from './../../../../shared/models/Recipe';
import { ListItem } from './../core/list/list.component';
import { ProfileDataService } from '../core/profile-data.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];
  public recipes: ListItem[];

  constructor(
    private router: Router,
    private profileDataService: ProfileDataService) { 
  }

  ngOnInit() {
    this.recipes = [];

    let sub = this.profileDataService.recipeData.subscribe(recipes => {
      this.recipes = recipes.map(recipe => this.mapRecipeToListItem(recipe));
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
    this.router.navigate(['/recipe', recipeID]);
  }
}
