"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_type_1 = require("../enum/object-type");
const object_id_1 = require("../util/object-id");
const response_1 = require("../util/response");
class BrewLogic {
    constructor(brewData, profileData) {
        this.brewData = brewData;
        this.profileData = profileData;
    }
    get(brewID) {
        if (!brewID) {
            return Promise.resolve(response_1.ResponseUtil.fail('Couldn\'t fetch Brew: ID is required.'));
        }
        return this.brewData.get(brewID);
    }
    getByOwnerID(ownerProfileID) {
        if (!ownerProfileID) {
            return Promise.resolve(response_1.ResponseUtil.fail('Couldn\'t fetch brews: Owner Profile ID required.'));
        }
        return this.brewData.getByOwnerID(ownerProfileID);
    }
    create(profileExternalID, newBrew) {
        if (!newBrew || !newBrew.name) {
            return Promise.resolve(response_1.ResponseUtil.fail('Couldn\'t create brew: Name is required.'));
        }
        return this.checkUserOwnsProfile(profileExternalID, newBrew.ownerProfileID).then(isOwner => {
            if (!isOwner) {
                return Promise.resolve(response_1.ResponseUtil.fail('Couldn\'t create brew: Not logged in as claimed brew owner.'));
            }
            newBrew.id = object_id_1.ID.new(object_type_1.ObjectType.Brew);
            return this.brewData.create(newBrew);
        });
    }
    update(profileExternalID, updatedBrew) {
        if (!updatedBrew || !updatedBrew.id || !updatedBrew.name) {
            return Promise.resolve(response_1.ResponseUtil.fail('Couldn\'t update Brew: ID and Name are required.'));
        }
        return this.checkUserOwnsProfile(profileExternalID, updatedBrew.ownerProfileID).then(isOwner => {
            if (!isOwner) {
                return Promise.resolve(response_1.ResponseUtil.fail('Couldn\'t create brew: Not logged in as claimed brew owner.'));
            }
            return this.brewData.update(updatedBrew.id, updatedBrew);
        });
    }
    checkUserOwnsProfile(externalID, profileID) {
        return this.profileData.getByExternalID(externalID).then(response => {
            return response && response.success && response.data.id === profileID;
        });
    }
}
exports.BrewLogic = BrewLogic;
//# sourceMappingURL=brew-logic.js.map