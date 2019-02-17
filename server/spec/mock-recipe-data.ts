import { OperationResponse } from './../../shared/contracts/OperationResponse';
import { Recipe } from './../../shared/models/Recipe';
import { IRecipeData } from './../data/recipe-data';

export class MockRecipeData implements IRecipeData {
    private collection = [];

    setCollection(recipes: Recipe[]): void {
        this.collection = recipes;
    }

    get(recipeID: string): Promise<OperationResponse<Recipe>> {
        return new Promise((resolve, reject) => {
            let testRecipe = { id: recipeID, name: 'Test Recipe' };
            return resolve({ success: true, data: testRecipe });
        });
    }

    getByOwnerID(ownerProfileID: string): Promise<OperationResponse<Recipe[]>> {
        return new Promise((resolve, reject) => {
            return resolve({ success: true, data: this.collection });
        });
    }

    create(newRecipe: Recipe): Promise<OperationResponse<Recipe>> {
        return new Promise((resolve, reject) => {
            return resolve({ success: true, data: newRecipe });
        });
    }

    update(recipeID: string, updatedBrew: Recipe): Promise<OperationResponse<Recipe>> {
        return new Promise((resolve, reject) => {
            return resolve({ success: true, data: updatedBrew });
        });
    }
}