import { IProfileData } from 'data/profile-data';
import { Profile } from '../../shared/models/Profile';
import { OperationResponse } from '../../shared/contracts/OperationResponse';
import { ObjectType } from '../enum/object-type';
import { ID } from './../util/object-id';
import { ResponseUtil } from './../util/response';

export interface IProfileLogic {
    login(token: string, externalID: string): Promise<OperationResponse<Profile>>;
    register(token: string, newProfile: Profile): Promise<OperationResponse<Profile>>;
}

export class ProfileLogic implements IProfileLogic {
    private profileData: IProfileData;

    constructor(brewData: IProfileData) {
        this.profileData = brewData;
    }

    login(token: string, externalID: string): Promise<OperationResponse<Profile>> {
        
        return this.profileData.getByExternalID(externalID).then(response => {
            let profile = response.data;

            if (!profile) {
                return Promise.resolve(ResponseUtil.fail<Profile>('Profile does not exist for that External ID'));
            }

            return Promise.resolve(ResponseUtil.succeed(profile));
        });
    }

    register(token: string, newProfile: Profile): Promise<OperationResponse<Profile>> {

        if (!newProfile || !newProfile.name) {
            return Promise.resolve({ success: false, message: 'Couldn\'t register: Name is required.' });
        }

        if (!newProfile.externalID) {
            return Promise.resolve({ success: false, message: 'Couldn\'t register: External ID is required.' });
        }

        return this.profileData.getByExternalID(newProfile.externalID).then(response => {
            if (response.success) {
                return Promise.resolve({ success: false, message: 'Profile already exists with that External ID.' });
            }

            newProfile.id = ID.new(ObjectType.Profile);

            return this.profileData.create(newProfile).then(createResponse => {
                let profile = createResponse.data;

                if (!createResponse.success) {
                    return Promise.resolve(ResponseUtil.fail<Profile>('Failed creating profile', createResponse));
                }

                return this.login(token, profile.externalID);
            });
        });
    }
}