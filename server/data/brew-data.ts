import { EmptyOperationResponse, OperationResponse } from '../../shared/contracts/OperationResponse';
import { Brew } from './../../shared/models/Brew';

export interface IBrewData {
    create(brew: Brew): Promise<EmptyOperationResponse>;
    get(brewID: string): Promise<OperationResponse<Brew>>;
}

export class BrewData implements IBrewData {
    create(brew: Brew): Promise<OperationResponse<Brew>> {
        return new Promise((resolve, reject) => {
            // TODO
            return resolve({ success: true });
        });
    }

    get(brewID: string): Promise<OperationResponse<Brew>> {
        return new Promise((resolve, reject) => {
            // TODO
            let newBrew = new Brew();
            newBrew.name = 'Test Brew';
            newBrew.id = brewID;
            return resolve({ success: true, data: newBrew });
        });
    }
}
