import { IProfileData } from './../data/profile-data';
import { OperationResponse } from './../../shared/contracts/OperationResponse';
import { Profile } from './../../shared/models/Profile';

export class MockProfileData implements IProfileData {

    public readonly testExternalID = 'Test External ID';
    public readonly testProfileID = 'Test Profile ID';
    public readonly testProfileName = 'Test Profile Name';

    get(id: string): Promise<OperationResponse<Profile>> {
        return new Promise((resolve, reject) => {
            let testProfile = { id: id, externalID: this.testExternalID, name: this.testProfileName };
            return resolve({ success: true, data: testProfile });
        });
    }

    getByExternalID(externalID: string): Promise<OperationResponse<Profile>> {
        return new Promise((resolve, reject) => {
            let testProfile = { id: this.testProfileID, externalID: externalID, name: this.testProfileName };
            return resolve({ success: true, data: testProfile });
        });
    }

    create(data: Profile): Promise<OperationResponse<Profile>> {
        return new Promise((resolve, reject) => {
            return resolve({ success: true, data: data });
        });
    }

    update(id: string, data: Profile): Promise<OperationResponse<Profile>> {
        return new Promise((resolve, reject) => {
            return resolve({ success: true, data: data });
        });
    }
}