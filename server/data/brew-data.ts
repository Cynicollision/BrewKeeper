import { EmptyOperationResponse, OperationResponse } from '../../shared/contracts/OperationResponse';
import { Brew } from './../../shared/models/Brew';

export interface IBrewData {
    create(brew: Brew): Promise<OperationResponse<Brew>>;
    get(brewID: string): Promise<OperationResponse<Brew>>;
}

export class BrewData implements IBrewData {
    create(newBrew: Brew): Promise<OperationResponse<Brew>> {
        return new Promise((resolve, reject) => {
            // TODO
            return resolve({ success: true, data: newBrew });
        });
    }

    get(brewID: string): Promise<OperationResponse<Brew>> {
        return new Promise((resolve, reject) => {
            // TODO
            let testBrew = new Brew();
            testBrew.name = 'Test Brew';
            testBrew.id = brewID;
            return resolve({ success: true, data: testBrew });
        });
    }
}
