import { IBrewData } from './../data/brew-data';
import { OperationResponse } from './../../shared/contracts/OperationResponse';
import { Brew } from './../../shared/models/Brew';

export class MockBrewData implements IBrewData {
    private collection = [];

    setCollection(brews: Brew[]): void {
        this.collection = brews;
    }

    get(brewID: string): Promise<OperationResponse<Brew>> {
        return new Promise((resolve, reject) => {
            let testBrew = { id: brewID, name: 'Test Brew' };
            return resolve({ success: true, data: testBrew });
        });
    }

    getByOwnerID(ownerProfileID: string): Promise<OperationResponse<Brew[]>> {
        return new Promise((resolve, reject) => {
            return resolve({ success: true, data: this.collection });
        });
    }

    create(newBrew: Brew): Promise<OperationResponse<Brew>> {
        return new Promise((resolve, reject) => {
            return resolve({ success: true, data: newBrew });
        });
    }

    update(brewID: string, updatedBrew: Brew): Promise<OperationResponse<Brew>> {
        return new Promise((resolve, reject) => {
            return resolve({ success: true, data: updatedBrew });
        });
    }
}