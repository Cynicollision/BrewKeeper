import { Brew } from './Brew';
import { Recipe } from './Recipe';

export interface ProfileData {
    brews: Brew[];
    recipes: Recipe[];
}