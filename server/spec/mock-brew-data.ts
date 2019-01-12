import { IBrewData } from './../data/brew-data';
import { OperationResponse } from './../../shared/contracts/OperationResponse';
import { Brew } from './../../shared/models/Brew';

export class MockBrewData implements IBrewData {

    get(brewID: string): Promise<OperationResponse<Brew>> {
        return new Promise((resolve, reject) => {
            // TODO
            let testBRew = new Brew();
            testBRew.name = 'Test Brew';
            testBRew.id = brewID;
            return resolve({ success: true, data: testBRew });
        });
    }

    create(newBrew: Brew): Promise<OperationResponse<Brew>> {
        return new Promise((resolve, reject) => {
            // TODO
            return resolve({ success: true });
        });
    }

    update(updatedBrew: Brew): Promise<OperationResponse<Brew>> {
        return new Promise((resolve, reject) => {
            // TODO
            return resolve({ success: true });
        });
    }
}