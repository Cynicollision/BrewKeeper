import { Brew } from './Brew';
import { Recipe } from './Recipe';

export interface Profile {
    id: string;
    externalID: string;
    name: string;
}

export interface ProfileData {
    summary: ProfileSummary;
    brews: Brew[];
    recipes: Recipe[];
}

export interface ProfileSummary {
    brewCount: number;
    brewingSince: string;
    firstBrew: Brew;
    activeBrewCount: number;
    hasActiveBrew: boolean;
    recipeCount: number;
    topRecipe: Recipe;
    topRecipeBrewedTimes: number;
}