import { OperationResponse } from '../../shared/contracts/OperationResponse';
import { Profile } from '../../shared/models/Profile';
import { ProfileData } from '../../shared/models/ProfileData';
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
                    return {
                        success: true,
                        data: {
                            brews: brewResponse.data,
                            recipes: recipeResponse.data,
                        },
                    };
               });
            });
        });
    }
 
}