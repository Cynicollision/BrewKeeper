"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_type_1 = require("../enum/object-type");
const object_id_1 = require("../util/object-id");
const response_1 = require("../util/response");
class BrewLogic {
    constructor(brewData) {
        this.brewData = brewData;
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
    create(sessionProfileID, newBrew) {
        if (!newBrew || !newBrew.name) {
            return Promise.resolve({ success: false, message: 'Couldn\'t create brew: Name is required.' });
        }
        if (!sessionProfileID) {
            return Promise.resolve({ success: false, message: 'Must be logged in to create a Brew.' });
        }
        newBrew.id = object_id_1.ID.new(object_type_1.ObjectType.Brew);
        newBrew.ownerProfileID = sessionProfileID;
        return this.brewData.create(newBrew);
    }
    update(sessionProfileID, brewID, updatedBrew) {
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
    sessionOwnsBrew(sessionProfileID, brew) {
        return sessionProfileID === brew.ownerProfileID;
    }
}
exports.BrewLogic = BrewLogic;
//# sourceMappingURL=brew-logic.js.map