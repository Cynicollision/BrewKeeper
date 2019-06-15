"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_type_1 = require("../enum/object-type");
const object_id_1 = require("../util/object-id");
const response_1 = require("../util/response");
class ProfileLogic {
    constructor(brewData, profileData, recipeData) {
        this.brewData = brewData;
        this.profileData = profileData;
        this.recipeData = recipeData;
    }
    login(externalID) {
        return this.profileData.getByExternalID(externalID).then(response => {
            let profile = response.data;
            if (!profile) {
                return Promise.resolve(response_1.ResponseUtil.fail('Profile does not exist for that External ID'));
            }
            return Promise.resolve(response_1.ResponseUtil.succeed(profile));
        });
    }
    register(externalID, userName) {
        if (!externalID || !userName) {
            return Promise.resolve(response_1.ResponseUtil.fail('Couldn\'t register: External ID and User Name are required.'));
        }
        return this.profileData.getByExternalID(externalID).then(response => {
            if (response.success) {
                return Promise.resolve(response_1.ResponseUtil.fail('Profile already exists with that External ID.'));
            }
            let newProfile = {
                id: object_id_1.ID.new(object_type_1.ObjectType.Profile),
                externalID: externalID,
                name: userName,
            };
            return this.profileData.create(newProfile).then(createResponse => {
                let profile = createResponse.data;
                if (!createResponse.success) {
                    return Promise.resolve(response_1.ResponseUtil.fail('Failed creating profile', createResponse));
                }
                return this.login(profile.externalID);
            });
        });
    }
    getProfileData(externalID, profileID) {
        if (!externalID || !profileID) {
            return Promise.resolve(response_1.ResponseUtil.fail('Couldn\'t retrieve profile data: External ID and Profile ID are required.'));
        }
        return this.profileData.getByExternalID(externalID).then(response => {
            if (!response || !response.success || response.data.id !== profileID) {
                return Promise.resolve(response_1.ResponseUtil.fail('Couldn\'t retrieve profile data: Not logged in as claimed profile owner.'));
            }
            return this.recipeData.getByOwnerID(profileID).then(recipeResponse => {
                return this.brewData.getByOwnerID(profileID).then(brewResponse => {
                    let summary = this.getProfileSummary(brewResponse.data, recipeResponse.data);
                    return {
                        success: true,
                        data: {
                            summary: summary,
                            brews: brewResponse.data,
                            recipes: recipeResponse.data,
                        },
                    };
                });
            });
        });
    }
    getProfileSummary(brews, recipes) {
        brews = brews || [];
        recipes = recipes || [];
        let recipeMap = {};
        recipes.forEach(recipe => recipeMap[recipe.id] = recipe);
        let activeBrewCount = 0;
        let hasActiveBrew = false;
        let now = new Date(Date.now());
        let firstBrew = null;
        let oldestBrewDate = new Date(8640000000000000);
        let recipeCountMap = {};
        let topRecipe = null;
        let topRecipeCount = 0;
        brews.forEach(brew => {
            if (brew.recipeID && !recipeCountMap[brew.recipeID]) {
                recipeCountMap[brew.recipeID] = 0;
            }
            recipeCountMap[brew.recipeID]++;
            if (recipeCountMap[brew.recipeID] > topRecipeCount) {
                topRecipeCount = recipeCountMap[brew.recipeID];
                topRecipe = recipeMap[brew.recipeID];
            }
            if (brew.brewDate) {
                let brewDate = new Date(brew.brewDate);
                if (brewDate < oldestBrewDate) {
                    firstBrew = brew;
                    oldestBrewDate = brewDate;
                }
            }
            if (brew.bottleDate) {
                if (new Date(brew.bottleDate) > now) {
                    hasActiveBrew = true;
                    activeBrewCount++;
                }
            }
            if (brew.chillDate) {
                if (new Date(brew.chillDate) > now) {
                    hasActiveBrew = true;
                    activeBrewCount++;
                }
            }
        });
        let brewingSince = '';
        if (firstBrew != null) {
            brewingSince = `${oldestBrewDate.getMonth() + 1}/${oldestBrewDate.getDate()}/${oldestBrewDate.getFullYear()}`;
        }
        return {
            brewCount: brews.length,
            brewingSince: brewingSince,
            activeBrewCount: activeBrewCount,
            hasActiveBrew: hasActiveBrew,
            firstBrew: firstBrew,
            recipeCount: recipes.length,
            topRecipe: topRecipe,
            topRecipeBrewedTimes: topRecipeCount,
        };
    }
}
exports.ProfileLogic = ProfileLogic;
//# sourceMappingURL=profile-logic.js.map