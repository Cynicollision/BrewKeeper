"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_id_1 = require("../util/object-id");
const response_1 = require("../util/response");
class ResourceLogic {
    constructor(resourceData, profileData, config) {
        this.resourceData = resourceData;
        this.profileData = profileData;
        this.config = config;
    }
    checkUserOwnsProfile(externalID, profileID) {
        return this.profileData.getByExternalID(externalID).then(response => {
            return response && response.success && response.data.id === profileID;
        });
    }
    get name() {
        return this.config.name;
    }
    get(id) {
        if (!id) {
            return Promise.resolve(response_1.ResponseUtil.fail(`Couldn\'t fetch ${this.name}: ID is required.`));
        }
        return this.resourceData.get(id);
    }
    getByOwnerID(ownerProfileID) {
        if (!ownerProfileID) {
            return Promise.resolve(response_1.ResponseUtil.fail(`Couldn\'t fetch ${this.name} data: Owner Profile ID required.`));
        }
        return this.resourceData.getByOwnerID(ownerProfileID);
    }
    create(profileExternalID, data) {
        if (!data || !data.name) {
            return Promise.resolve(response_1.ResponseUtil.fail(`Couldn\'t create ${this.name}: Name is required.`));
        }
        return this.checkUserOwnsProfile(profileExternalID, data.ownerProfileID).then(isOwner => {
            if (!isOwner) {
                return Promise.resolve(response_1.ResponseUtil.fail(`Couldn\'t create ${this.name}: Not logged in as claimed ${this.name} owner.`));
            }
            data.id = object_id_1.ID.new(this.config.objectType);
            return this.resourceData.create(data);
        });
    }
    update(profileExternalID, data) {
        if (!data || !data.id || !data.name) {
            return Promise.resolve(response_1.ResponseUtil.fail(`Couldn\'t update ${this.name}: ID and Name are required.`));
        }
        return this.checkUserOwnsProfile(profileExternalID, data.ownerProfileID).then(isOwner => {
            if (!isOwner) {
                return Promise.resolve(response_1.ResponseUtil.fail(`Couldn\'t create ${this.name}: Not logged in as claimed ${this.name} owner.`));
            }
            return this.resourceData.update(data.id, data);
        });
    }
    delete(profileExternalID, id) {
        return this.resourceData.get(id).then(response => {
            if (!response.success) {
                return Promise.resolve(response_1.ResponseUtil.fail(`Couldn\'t retrieve ${this.name} for validation before deleting.`));
            }
            return this.checkUserOwnsProfile(profileExternalID, response.data.ownerProfileID).then(isOwner => {
                if (!isOwner) {
                    return Promise.resolve(response_1.ResponseUtil.fail(`Couldn\'t delete ${this.name}: Not logged in as claimed ${this.name} Owner.`));
                }
                return this.resourceData.delete(response.data.id);
            });
        });
    }
}
exports.ResourceLogic = ResourceLogic;
//# sourceMappingURL=logic-base.js.map