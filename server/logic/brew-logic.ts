import { Brew } from '../../shared/models/Brew';
import { OperationResponse } from '../../shared/contracts/OperationResponse';
import { ObjectType } from '../enum/object-type';
import { IBrewData } from '../data/brew-data';
import { ID } from '../util/object-id';
import { ResponseUtil } from '../util/response';

export interface IBrewLogic {
    create(brew: Brew): Promise<OperationResponse<Brew>>;
    get(brewID: string): Promise<OperationResponse<Brew>>;
    getMany(brewIDs: string[]): Promise<OperationResponse<Brew[]>>;
    update(brew: Brew): Promise<OperationResponse<Brew>>;
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

    getMany(brewIDs: string[]): Promise<OperationResponse<Brew[]>> {

        if (!brewIDs || !brewIDs.length) {
            return Promise.resolve(ResponseUtil.fail('Couldn\'t fetch brews: at least one Brew ID required.'));
        }

        return this.brewData.getMany(brewIDs);
    }

    create(newBrew: Brew): Promise<OperationResponse<Brew>> {

        if (!newBrew || !newBrew.name) {
            return Promise.resolve({ success: false, message: 'Couldn\'t create brew: Name is required.' });
        }

        newBrew.id = ID.new(ObjectType.Brew);

        return this.brewData.create(newBrew);
    }

    update(newBrew: Brew): Promise<OperationResponse<Brew>> {

        if (!newBrew || !newBrew.name) {
            return Promise.resolve({ success: false, message: 'Couldn\'t update brew: Name is required.' });
        }

        return this.brewData.update(newBrew);
    }
}