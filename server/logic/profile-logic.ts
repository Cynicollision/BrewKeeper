import { IProfileData } from 'data/profile-data';
import { Profile } from '../../shared/models/Profile';
import { ProfileSession } from '../../shared/models/ProfileSession';
import { OperationResponse } from '../../shared/contracts/OperationResponse';
import { ObjectType } from '../enum/object-type';
import { ID } from './../util/object-id';
import { ResponseUtil } from './../util/response';

export interface IProfileLogic {
    login(token: string, externalID: string): Promise<OperationResponse<ProfileSession>>;
    register(token: string, newProfile: Profile): Promise<OperationResponse<ProfileSession>>;
}

export class ProfileLogic implements IProfileLogic {
    private profileData: IProfileData;

    constructor(brewData: IProfileData) {
        this.profileData = brewData;
    }

    login(token: string, externalID: string): Promise<OperationResponse<ProfileSession>> {
        
        return this.profileData.getByExternalID(externalID).then(response => {
            let profile = response.data;

            if (!profile) {
                return Promise.resolve(ResponseUtil.fail<ProfileSession>('Profile does not exist for that External ID'));
            }

            return Promise.resolve(ResponseUtil.succeed({
                token: token,
                profile: profile,
            }));
        });
    }

    register(token: string, newProfile: Profile): Promise<OperationResponse<ProfileSession>> {

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
                    return Promise.resolve(ResponseUtil.fail<ProfileSession>('Failed creating profile', createResponse));
                }

                return this.login(token, profile.externalID);
            });
        });
    }
}