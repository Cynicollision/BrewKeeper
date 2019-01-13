import { IProfileData } from './../data/profile-data';
import { OperationResponse } from './../../shared/contracts/OperationResponse';
import { Profile } from './../../shared/models/Profile';

export class MockProfileData implements IProfileData {

    get(id: string): Promise<OperationResponse<Profile>> {
        return new Promise((resolve, reject) => {
            let testProfile = { id: id, externalID: 'Test External ID', name: 'Test Profile' };
            return resolve({ success: true, data: testProfile });
        });
    }

    getByExternalID(externalID: string): Promise<OperationResponse<Profile>> {
        return new Promise((resolve, reject) => {
            let testProfile = { id: 'Test ID', externalID: externalID, name: 'Test Profile' };

            return resolve({ success: true, data: testProfile });
        });
    }

    create(data: Profile): Promise<OperationResponse<Profile>> {
        return new Promise((resolve, reject) => {
            // TODO
            return resolve({ success: true, data: data });
        });
    }

    update(id: string, data: Profile): Promise<OperationResponse<Profile>> {
        return new Promise((resolve, reject) => {
            // TODO
            return resolve({ success: true, data: data });
        });
    }
}