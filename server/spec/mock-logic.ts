import { IProfileData } from './../data/profile-data';
import { ObjectType } from '../enum/object-type';
import { ResourceLogic } from './../logic/logic-base';
import { TestData, MockDataController } from './mock-data';

export class MockResourceLogic extends ResourceLogic<TestData> {

    constructor(brewData: MockDataController, profileData: IProfileData) {
        let config = { name: 'Test', objectType: <ObjectType>'TEST' };
        super(brewData, profileData, config);
    }
}