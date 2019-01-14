import { Brew } from '../../shared/models/Brew';
import { OperationResponse } from '../../shared/contracts/OperationResponse';
import { ObjectType } from '../enum/object-type';
import { IBrewData } from '../data/brew-data';
import { ID } from '../util/object-id';
import { ResponseUtil } from '../util/response';

export interface IBrewLogic {
    create(sessionProfileID: string, newBrew: Brew): Promise<OperationResponse<Brew>>;
    get(brewID: string): Promise<OperationResponse<Brew>>;
    getByOwnerID(ownerProfileID: string): Promise<OperationResponse<Brew[]>>;
    update(sessionProfileID: string, brewID, updatedBrew: Brew): Promise<OperationResponse<Brew>>;
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
            return Promise.resolve(ResponseUtil.fail('Couldn\'t fetch brews: Owner Profile ID required.'));
        }

        return this.brewData.getByOwnerID(ownerProfileID);
    }

    create(sessionProfileID: string, newBrew: Brew): Promise<OperationResponse<Brew>> {

        if (!newBrew || !newBrew.name) {
            return Promise.resolve({ success: false, message: 'Couldn\'t create brew: Name is required.' });
        }

        if (!sessionProfileID) {
            return Promise.resolve({ success: false, message: 'Must be logged in to create a Brew.' })
        }

        newBrew.id = ID.new(ObjectType.Brew);
        newBrew.ownerProfileID = sessionProfileID;

        return this.brewData.create(newBrew);
    }

    update(sessionProfileID: string, brewID: string, updatedBrew: Brew): Promise<OperationResponse<Brew>> {

        if (!updatedBrew || !brewID || !updatedBrew.name) {
            return Promise.resolve({ success: false, message: 'Couldn\'t update Brew: ID and Name are required.' });
        }
        
        return this.get(brewID).then(response => {

            if (!this.sessionOwnsBrew(sessionProfileID, response.data || {})) {
                return Promise.resolve({ success: false, message: 'Must be logged in as Brew Owner in order to update.' });
            }

            return this.brewData.update(brewID, updatedBrew);
        });
    }

    private sessionOwnsBrew(sessionProfileID: string, brew: Brew): boolean {
        return sessionProfileID === brew.ownerProfileID;
    }
}