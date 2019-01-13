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

    getMany(brewIDs: string[]): Promise<OperationResponse<Brew[]>> {
        return new Promise((resolve, reject) => {
            let testBrews = brewIDs.map(id => { 
                return { id: id, name: 'Brew ' + id };
            });
            return resolve({ success: true, data: testBrews });
        });
    }

    create(newBrew: Brew): Promise<OperationResponse<Brew>> {
        return new Promise((resolve, reject) => {
            // TODO
            return resolve({ success: true, data: newBrew });
        });
    }

    update(updatedBrew: Brew): Promise<OperationResponse<Brew>> {
        return new Promise((resolve, reject) => {
            // TODO
            return resolve({ success: true });
        });
    }
}