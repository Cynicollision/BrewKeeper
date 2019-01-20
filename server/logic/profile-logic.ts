import { Config } from '../config';
import { IProfileData } from '../data/profile-data';
import { ObjectType } from '../enum/object-type';
import { ID } from '../util/object-id';
import { ResponseUtil } from '../util/response';
import { OperationResponse } from '../../shared/contracts/OperationResponse';
import { Profile } from '../../shared/models/Profile';

export interface IProfileLogic {
    login(externalID: string): Promise<OperationResponse<Profile>>;
    register(externalID: string, userName: string): Promise<OperationResponse<Profile>>;
}

export class ProfileLogic implements IProfileLogic {
    private profileData: IProfileData;

    constructor(brewData: IProfileData) {
        this.profileData = brewData;
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
            return Promise.resolve({ success: false, message: 'Couldn\'t register: External ID and User Name are required.' });
        }

        return this.profileData.getByExternalID(externalID).then(response => {
            if (response.success) {
                return Promise.resolve({ success: false, message: 'Profile already exists with that External ID.' });
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
}