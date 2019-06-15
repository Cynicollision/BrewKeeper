import { OperationResponse } from '../../shared/contracts/OperationResponse';
import { Brew } from '../../shared/models/Brew';
import { Profile, ProfileData, ProfileSummary } from '../../shared/models/Profile';
import { Recipe } from '../../shared/models/Recipe';
import { IBrewData } from '../data/brew-data';
import { IRecipeData } from '../data/recipe-data';
import { IProfileData } from '../data/profile-data';
import { ObjectType } from '../enum/object-type';
import { ID } from '../util/object-id';
import { ResponseUtil } from '../util/response';

export interface IProfileLogic {
    login(externalID: string): Promise<OperationResponse<Profile>>;
    register(externalID: string, userName: string): Promise<OperationResponse<Profile>>;
    getProfileData(externalID: string, profileId: string): Promise<OperationResponse<ProfileData>>;
}

export class ProfileLogic implements IProfileLogic {

    constructor(private brewData: IBrewData, 
        private profileData: IProfileData, 
        private recipeData: IRecipeData) {
    }

    login(externalID: string): Promise<OperationResponse<Profile>> {

        return this.profileData.getByExternalID(externalID).then(response => {
            let profile = response.data;

            if (!profile) {
                return Promise.resolve(ResponseUtil.fail<Profile>('Profile does not exist for that External ID'));
            }

            return Promise.resolve(ResponseUtil.succeed(profile));
        });
    }

    register(externalID: string, userName: string): Promise<OperationResponse<Profile>> {

        if (!externalID || !userName) {
            return Promise.resolve(ResponseUtil.fail<Profile>('Couldn\'t register: External ID and User Name are required.'));
        }

        return this.profileData.getByExternalID(externalID).then(response => {
            if (response.success) {
                return Promise.resolve(ResponseUtil.fail<Profile>('Profile already exists with that External ID.'));
            }

            let newProfile = {
                id: ID.new(ObjectType.Profile),
                externalID: externalID,
                name: userName,
            };

            return this.profileData.create(newProfile).then(createResponse => {
                let profile = createResponse.data;

                if (!createResponse.success) {
                    return Promise.resolve(ResponseUtil.fail<Profile>('Failed creating profile', createResponse));
                }

                return this.login(profile.externalID);
            });
        });
    }

    getProfileData(externalID: string, profileID: string): Promise<OperationResponse<ProfileData>> {
        if (!externalID || !profileID) {
            return Promise.resolve(ResponseUtil.fail<ProfileData>('Couldn\'t retrieve profile data: External ID and Profile ID are required.'));
        }

        return this.profileData.getByExternalID(externalID).then(response => {
            if (!response || !response.success || response.data.id !== profileID) {
                return Promise.resolve(ResponseUtil.fail<ProfileData>('Couldn\'t retrieve profile data: Not logged in as claimed profile owner.'));
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
 
    getProfileSummary(brews: Brew[], recipes: Recipe[]): ProfileSummary {
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
            brewingSince = `${oldestBrewDate.getMonth()+1}/${oldestBrewDate.getDate()}/${oldestBrewDate.getFullYear()}`;
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