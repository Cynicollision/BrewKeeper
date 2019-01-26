import { IProfileData } from '../data/profile-data';
import { ObjectType } from '../enum/object-type';
import { ID } from '../util/object-id';
import { ResponseUtil } from '../util/response';
import { OperationResponse } from '../../shared/contracts/OperationResponse';
import { Profile } from '../../shared/models/Profile';
import { ProfileData } from '../../shared/models/ProfileData';
import { IBrewData } from 'data/brew-data';

export interface IProfileLogic {
    login(externalID: string): Promise<OperationResponse<Profile>>;
    register(externalID: string, userName: string): Promise<OperationResponse<Profile>>;
    getProfileData(externalID: string, profileId: string): Promise<OperationResponse<ProfileData>>;
}

export class ProfileLogic implements IProfileLogic {
    private brewData: IBrewData;
    private profileData: IProfileData;

    constructor(brewData: IBrewData, profileData: IProfileData) {
        this.brewData = brewData;
        this.profileData = profileData;
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

        return this.checkUserOwnsProfile(externalID, profileID).then(isOwner => {
            if (!isOwner) {
                return Promise.resolve(ResponseUtil.fail<ProfileData>('Couldn\'t retrieve profile data: Not logged in as claimed profile owner.'));
            }
            // TODO: also get recipe data
            return this.brewData.getByOwnerID(profileID).then(response => {
                return {
                    success: true,
                    data: {
                        brews: response.data,
                        recipes: [],
                    },
                };
            });
        });
    }

    private checkUserOwnsProfile(externalID: string, profileID: string): Promise<boolean> {
        return this.profileData.getByExternalID(externalID).then(response => {
            return response && response.success && response.data.id === profileID;
        });
    }
}