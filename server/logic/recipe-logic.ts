import { Recipe } from '../../shared/models/Recipe';
import { ResourceLogic, IResourceLogic } from './logic-base';
import { IProfileData } from '../data/profile-data';
import { IRecipeData } from '../data/recipe-data';
import { ObjectType } from '../enum/object-type';

export interface IRecipeLogic extends IResourceLogic<Recipe> {
}

export class RecipeLogic extends ResourceLogic<Recipe> implements IRecipeLogic {

    constructor(recipeData: IRecipeData, profileData: IProfileData) {
        let config = { name: 'Recipe', objectType: ObjectType.Recipe };
        super(recipeData, profileData, config);
    }
}