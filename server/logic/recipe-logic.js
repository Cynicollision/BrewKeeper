"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_type_1 = require("../enum/object-type");
const object_id_1 = require("../util/object-id");
const response_1 = require("../util/response");
class RecipeLogic {
    constructor(recipeData, profileData) {
        this.recipeData = recipeData;
        this.profileData = profileData;
    }
    get(recipeID) {
        if (!recipeID) {
            return Promise.resolve(response_1.ResponseUtil.fail('Couldn\'t fetch Brew: ID is required.'));
        }
        return this.recipeData.get(recipeID);
    }
    getByOwnerID(ownerProfileID) {
        if (!ownerProfileID) {
            return Promise.resolve(response_1.ResponseUtil.fail('Couldn\'t fetch brews: Owner Profile ID required.'));
        }
        return this.recipeData.getByOwnerID(ownerProfileID);
    }
    create(profileExternalID, newRecipe) {
        if (!newRecipe || !newRecipe.name) {
            return Promise.resolve(response_1.ResponseUtil.fail('Couldn\'t create recipe: Name is required.'));
        }
        return this.checkUserOwnsProfile(profileExternalID, newRecipe.ownerProfileID).then(isOwner => {
            if (!isOwner) {
                return Promise.resolve(response_1.ResponseUtil.fail('Couldn\'t create recipe: Not logged in as claimed recipe owner.'));
            }
            newRecipe.id = object_id_1.ID.new(object_type_1.ObjectType.Recipe);
            return this.recipeData.create(newRecipe);
        });
    }
    update(profileExternalID, udpatedRecipe) {
        if (!udpatedRecipe || !udpatedRecipe.id || !udpatedRecipe.name) {
            return Promise.resolve(response_1.ResponseUtil.fail('Couldn\'t update recipe: ID and Name are required.'));
        }
        return this.checkUserOwnsProfile(profileExternalID, udpatedRecipe.ownerProfileID).then(isOwner => {
            if (!isOwner) {
                return Promise.resolve(response_1.ResponseUtil.fail('Couldn\'t create recipe: Not logged in as claimed recipe owner.'));
            }
            return this.recipeData.update(udpatedRecipe.id, udpatedRecipe);
        });
    }
    checkUserOwnsProfile(externalID, profileID) {
        return this.profileData.getByExternalID(externalID).then(response => {
            return response && response.success && response.data.id === profileID;
        });
    }
}
exports.RecipeLogic = RecipeLogic;
//# sourceMappingURL=recipe-logic.js.map