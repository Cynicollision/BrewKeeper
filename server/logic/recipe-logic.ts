import { Recipe } from '../../shared/models/Recipe';
import { OperationResponse } from '../../shared/contracts/OperationResponse';
import { ObjectType } from '../enum/object-type';
import { ID } from '../util/object-id';
import { ResponseUtil } from '../util/response';
import { IProfileData } from 'data/profile-data';
import { IRecipeData } from 'data/recipe-data';

export interface IRecipeLogic {
    create(profileExternalID: string, newRecipe: Recipe): Promise<OperationResponse<Recipe>>;
    get(recipeID: string): Promise<OperationResponse<Recipe>>;
    getByOwnerID(ownerProfileID: string): Promise<OperationResponse<Recipe[]>>;
    update(profileExternalID: string, updatedRecipe: Recipe): Promise<OperationResponse<Recipe>>;
}

export class RecipeLogic implements IRecipeLogic {
    private recipeData: IRecipeData;
    private profileData: IProfileData;

    constructor(recipeData: IRecipeData, profileData: IProfileData) {
        this.recipeData = recipeData;
        this.profileData = profileData;
    }

    get(recipeID: string): Promise<OperationResponse<Recipe>> {

        if (!recipeID) {
            return Promise.resolve(ResponseUtil.fail('Couldn\'t fetch Brew: ID is required.'));
        }

        return this.recipeData.get(recipeID);
    }

    getByOwnerID(ownerProfileID: string): Promise<OperationResponse<Recipe[]>> {

        if (!ownerProfileID) {
            return Promise.resolve(ResponseUtil.fail('Couldn\'t fetch brews: Owner Profile ID required.'));
        }

        return this.recipeData.getByOwnerID(ownerProfileID);
    }

    create(profileExternalID: string, newRecipe: Recipe): Promise<OperationResponse<Recipe>> {

        if (!newRecipe || !newRecipe.name) {
            return Promise.resolve(ResponseUtil.fail('Couldn\'t create recipe: Name is required.'));
        }

        return this.checkUserOwnsProfile(profileExternalID, newRecipe.ownerProfileID).then(isOwner => {
            if (!isOwner) {
                return Promise.resolve(ResponseUtil.fail('Couldn\'t create recipe: Not logged in as claimed recipe owner.'));
            }

            newRecipe.id = ID.new(ObjectType.Recipe);
            return this.recipeData.create(newRecipe);
        });
    }

    update(profileExternalID: string, udpatedRecipe: Recipe): Promise<OperationResponse<Recipe>> {

        if (!udpatedRecipe || !udpatedRecipe.id || !udpatedRecipe.name) {
            return Promise.resolve(ResponseUtil.fail('Couldn\'t update recipe: ID and Name are required.'));
        }

        return this.checkUserOwnsProfile(profileExternalID, udpatedRecipe.ownerProfileID).then(isOwner => {
            if (!isOwner) {
                return Promise.resolve(ResponseUtil.fail('Couldn\'t create recipe: Not logged in as claimed recipe owner.'));
            }

            return this.recipeData.update(udpatedRecipe.id, udpatedRecipe);
        });
    }

    private checkUserOwnsProfile(externalID: string, profileID: string): Promise<boolean> {
        return this.profileData.getByExternalID(externalID).then(response => {
            return response && response.success && response.data.id === profileID;
        });
    }
}