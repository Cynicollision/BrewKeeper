import { Brew } from '../../shared/models/Brew';
import { OperationResponse } from '../../shared/contracts/OperationResponse';
import { ObjectType } from '../enum/object-type';
import { IBrewData } from '../data/brew-data';
import { ID } from '../util/object-id';
import { ResponseUtil } from '../util/response';

export interface IBrewLogic {
    create(newBrew: Brew): Promise<OperationResponse<Brew>>;
    get(brewID: string): Promise<OperationResponse<Brew>>;
    getByOwnerID(ownerProfileID: string): Promise<OperationResponse<Brew[]>>;
    update(brewID, updatedBrew: Brew): Promise<OperationResponse<Brew>>;
}

export class BrewLogic implements IBrewLogic {
    private brewData: IBrewData;

    constructor(brewData: IBrewData) {
        this.brewData = brewData;
    }

    get(brewID: string): Promise<OperationResponse<Brew>> {

        if (!brewID) {
            return Promise.resolve(ResponseUtil.fail('Couldn\'t fetch Brew: ID is required.'));
        }

        return this.brewData.get(brewID);
    }

    getByOwnerID(ownerProfileID: string): Promise<OperationResponse<Brew[]>> {

        if (!ownerProfileID) {
            return Promise.resolve(ResponseUtil.fail('Couldn\'t fetch brews: owner profile ID required.'));
        }

        return this.brewData.getByOwnerID(ownerProfileID);
    }

    create(newBrew: Brew): Promise<OperationResponse<Brew>> {

        if (!newBrew || !newBrew.name) {
            return Promise.resolve({ success: false, message: 'Couldn\'t create brew: Name is required.' });
        }

        if (!newBrew.ownerProfileID) {
            return Promise.resolve({ success: false, message: 'Couldn\'t create brew: Owner ID is required.' });
        }

        newBrew.id = ID.new(ObjectType.Brew);

        return this.brewData.create(newBrew);
    }

    update(brewID: string, updatedBrew: Brew): Promise<OperationResponse<Brew>> {

        if (!updatedBrew || !brewID || !updatedBrew.name) {
            return Promise.resolve({ success: false, message: 'Couldn\'t update brew: ID and Name are required.' });
        }

        return this.brewData.update(brewID, updatedBrew);
    }
}