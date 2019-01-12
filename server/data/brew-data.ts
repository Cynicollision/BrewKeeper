import { EmptyOperationResponse, OperationResponse } from '../../shared/contracts/OperationResponse';
import { Brew } from './../../shared/models/Brew';

export interface IBrewData {
    get(brewID: string): Promise<OperationResponse<Brew>>;
    create(newBrew: Brew): Promise<OperationResponse<Brew>>;
    update(updatedBrew: Brew): Promise<OperationResponse<Brew>>;
}

export class BrewData implements IBrewData {

    get(brewID: string): Promise<OperationResponse<Brew>> {
        return new Promise((resolve, reject) => {
            // TODO
            let testBrew = new Brew();
            testBrew.name = 'Test Brew';
            testBrew.id = brewID;
            return resolve({ success: true, data: testBrew });
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
            return resolve({ success: true, data: updatedBrew });
        });
    }
}
