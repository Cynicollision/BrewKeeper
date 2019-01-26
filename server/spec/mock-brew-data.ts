import { IBrewData } from './../data/brew-data';
import { OperationResponse } from './../../shared/contracts/OperationResponse';
import { Brew } from './../../shared/models/Brew';

export class MockBrewData implements IBrewData {

    get(brewID: string): Promise<OperationResponse<Brew>> {
        return new Promise((resolve, reject) => {
            let testBrew = { id: brewID, name: 'Test Brew' };
            return resolve({ success: true, data: testBrew });
        });
    }

    getByOwnerID(ownerProfileID: string): Promise<OperationResponse<Brew[]>> {
        return new Promise((resolve, reject) => {
            let testBrews = ['123','abc','4f0'].map(id => { 
                return { id: id, ownerProfileID: ownerProfileID, name: 'Brew ' + id };
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

    update(brewID: string, updatedBrew: Brew): Promise<OperationResponse<Brew>> {
        return new Promise((resolve, reject) => {
            // TODO
            return resolve({ success: true, data: updatedBrew });
        });
    }
}