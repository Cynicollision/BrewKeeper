import { Brew } from '../../shared/models/Brew';
import { OperationResponse } from '../../shared/contracts/OperationResponse';
import { ObjectType } from '../enum/object-type';
import { IBrewData } from '../data/brew-data';
import { ID } from '../util/object-id';
import { ResponseUtil } from '../util/response';
import { ProfileSession } from '../../shared/models/ProfileSession';

export interface IBrewLogic {
    create(session: ProfileSession, newBrew: Brew): Promise<OperationResponse<Brew>>;
    get(brewID: string): Promise<OperationResponse<Brew>>;
    getByOwnerID(ownerProfileID: string): Promise<OperationResponse<Brew[]>>;
    update(session: ProfileSession, brewID, updatedBrew: Brew): Promise<OperationResponse<Brew>>;
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

    create(session: ProfileSession, newBrew: Brew): Promise<OperationResponse<Brew>> {

        if (!newBrew || !newBrew.name) {
            return Promise.resolve({ success: false, message: 'Couldn\'t create brew: Name is required.' });
        }

        if (!session || !session.profile.id) {
            return Promise.resolve({ success: false, message: 'Must be logged in to create a Brew.' })
        }

        newBrew.id = ID.new(ObjectType.Brew);
        newBrew.ownerProfileID = session.profile.id;

        return this.brewData.create(newBrew);
    }

    update(session: ProfileSession, brewID: string, updatedBrew: Brew): Promise<OperationResponse<Brew>> {

        if (!updatedBrew || !brewID || !updatedBrew.name) {
            return Promise.resolve({ success: false, message: 'Couldn\'t update Brew: ID and Name are required.' });
        }
        
        return this.get(brewID).then(response => {

            if (!this.sessionOwnsBrew(session, response.data || {})) {
                return Promise.resolve({ success: false, message: 'Must be logged in as Brew Owner in order to update.' });
            }

            return this.brewData.update(brewID, updatedBrew);
        });
    }

    private sessionOwnsBrew(session: ProfileSession, brew: Brew): boolean {
        if (session) {
            let profile = session.profile || { id: null };
            return profile.id === brew.ownerProfileID;
        }
        return false;
    }
}