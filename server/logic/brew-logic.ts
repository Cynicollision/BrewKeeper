import { Brew } from '../../shared/models/Brew';
import { OperationResponse } from '../../shared/contracts/OperationResponse';
import { ObjectType } from '../enum/object-type';
import { IBrewData } from '../data/brew-data';
import { ID } from '../util/object-id';
import { ResponseUtil } from '../util/response';
import { IProfileData } from 'data/profile-data';

export interface IBrewLogic {
    create(profileExternalID: string, newBrew: Brew): Promise<OperationResponse<Brew>>;
    get(brewID: string): Promise<OperationResponse<Brew>>;
    getByOwnerID(ownerProfileID: string): Promise<OperationResponse<Brew[]>>;
    update(profileExternalID: string, updatedBrew: Brew): Promise<OperationResponse<Brew>>;
}

export class BrewLogic implements IBrewLogic {
    private brewData: IBrewData;
    private profileData: IProfileData;

    constructor(brewData: IBrewData, profileData: IProfileData) {
        this.brewData = brewData;
        this.profileData = profileData;
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

    create(profileExternalID: string, newBrew: Brew): Promise<OperationResponse<Brew>> {

        if (!newBrew || !newBrew.name) {
            return Promise.resolve(ResponseUtil.fail('Couldn\'t create brew: Name is required.'));
        }

        return this.checkUserOwnsProfile(profileExternalID, newBrew.ownerProfileID).then(isOwner => {
            if (!isOwner) {
                return Promise.resolve(ResponseUtil.fail('Couldn\'t create brew: Not logged in as claimed brew owner.'));
            }

            newBrew.id = ID.new(ObjectType.Brew);
            return this.brewData.create(newBrew);
        });
    }

    update(profileExternalID: string, updatedBrew: Brew): Promise<OperationResponse<Brew>> {

        if (!updatedBrew || !updatedBrew.id || !updatedBrew.name) {
            return Promise.resolve(ResponseUtil.fail('Couldn\'t update Brew: ID and Name are required.'));
        }

        return this.checkUserOwnsProfile(profileExternalID, updatedBrew.ownerProfileID).then(isOwner => {
            if (!isOwner) {
                return Promise.resolve(ResponseUtil.fail('Couldn\'t create brew: Not logged in as claimed brew owner.'));
            }

            return this.brewData.update(updatedBrew.id, updatedBrew);
        });
    }

    private checkUserOwnsProfile(externalID: string, profileID: string): Promise<boolean> {
        return this.profileData.getByExternalID(externalID).then(response => {
            return response && response.success && response.data.id === profileID;
        });
    }
}