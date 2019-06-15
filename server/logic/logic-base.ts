import { OperationResponse } from '../../shared/contracts/OperationResponse';
import { ResourceBase } from '../../shared/models/ResourceBase';
import { IResourceController } from '../data/controller-base';
import { IProfileData } from '../data/profile-data';
import { ObjectType } from '../enum/object-type';
import { ID } from '../util/object-id';
import { ResponseUtil } from '../util/response';

export interface ResourceMeta {
    name: string;
    objectType: ObjectType;
}

export interface IResourceLogic<T> {
    create(profileExternalID: string, data: T): Promise<OperationResponse<T>>;
    delete(profileExternalID: string, id: string): Promise<OperationResponse<T>>;
    get(id: string): Promise<OperationResponse<T>>;
    getByOwnerID(ownerProfileID: string): Promise<OperationResponse<T[]>>;
    update(profileExternalID: string, data: T): Promise<OperationResponse<T>>;
}

export class ResourceLogic<T extends ResourceBase> implements IResourceLogic<T> {

    constructor(
        protected resourceData: IResourceController<T>, 
        protected profileData: IProfileData,
        private config: ResourceMeta) {
    }

    protected checkUserOwnsProfile(externalID: string, profileID: string): Promise<boolean> {
        return this.profileData.getByExternalID(externalID).then(response => {
            return response && response.success && response.data.id === profileID;
        });
    }

    private get name(): string {
        return this.config.name;
    }

    get(id: string): Promise<OperationResponse<T>> {

        if (!id) {
            return Promise.resolve(ResponseUtil.fail(`Couldn\'t fetch ${this.name}: ID is required.`));
        }

        return this.resourceData.get(id);
    }

    getByOwnerID(ownerProfileID: string): Promise<OperationResponse<T[]>> {

        if (!ownerProfileID) {
            return Promise.resolve(ResponseUtil.fail(`Couldn\'t fetch ${this.name} data: Owner Profile ID required.`));
        }

        return this.resourceData.getByOwnerID(ownerProfileID);
    }

    create(profileExternalID: string, data: T): Promise<OperationResponse<T>> {

        if (!data || !data.name) {
            return Promise.resolve(ResponseUtil.fail(`Couldn\'t create ${this.name}: Name is required.`));
        }

        return this.checkUserOwnsProfile(profileExternalID, data.ownerProfileID).then(isOwner => {
            if (!isOwner) {
                return Promise.resolve(ResponseUtil.fail<T>(`Couldn\'t create ${this.name}: Not logged in as claimed ${this.name} owner.`));
            }

            data.id = ID.new(this.config.objectType);
            return this.resourceData.create(data);
        });
    }

    update(profileExternalID: string, data: T): Promise<OperationResponse<T>> {

        if (!data || !data.id || !data.name) {
            return Promise.resolve(ResponseUtil.fail<T>(`Couldn\'t update ${this.name}: ID and Name are required.`));
        }

        return this.checkUserOwnsProfile(profileExternalID, data.ownerProfileID).then(isOwner => {
            if (!isOwner) {
                return Promise.resolve(ResponseUtil.fail<T>(`Couldn\'t create ${this.name}: Not logged in as claimed ${this.name} owner.`));
            }

            return this.resourceData.update(data.id, data);
        });
    }

    delete(profileExternalID: string, id: string): Promise<OperationResponse<T>> {

        return this.resourceData.get(id).then(response => {
            if (!response.success) {
                return Promise.resolve(ResponseUtil.fail<T>(`Couldn\'t retrieve ${this.name} for validation before deleting.`));
            }

            return this.checkUserOwnsProfile(profileExternalID, response.data.ownerProfileID).then(isOwner => {
                if (!isOwner) {
                    return Promise.resolve(ResponseUtil.fail<T>(`Couldn\'t delete ${this.name}: Not logged in as claimed ${this.name} Owner.`));
                }
    
                return this.resourceData.delete(response.data.id);
            });
        });
    }
}