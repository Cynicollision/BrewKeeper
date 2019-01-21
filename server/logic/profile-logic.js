"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_type_1 = require("../enum/object-type");
const object_id_1 = require("../util/object-id");
const response_1 = require("../util/response");
class ProfileLogic {
    constructor(brewData) {
        this.profileData = brewData;
    }
    login(externalID) {
        return this.profileData.getByExternalID(externalID).then(response => {
            let profile = response.data;
            if (!profile) {
                return Promise.resolve(response_1.ResponseUtil.fail('Profile does not exist for that External ID'));
            }
            return Promise.resolve(response_1.ResponseUtil.succeed(profile));
        });
    }
    register(externalID, userName) {
        if (!externalID || !userName) {
            return Promise.resolve({ success: false, message: 'Couldn\'t register: External ID and User Name are required.' });
        }
        return this.profileData.getByExternalID(externalID).then(response => {
            if (response.success) {
                return Promise.resolve({ success: false, message: 'Profile already exists with that External ID.' });
            }
            let newProfile = {
                id: object_id_1.ID.new(object_type_1.ObjectType.Profile),
                externalID: externalID,
                name: userName,
            };
            return this.profileData.create(newProfile).then(createResponse => {
                let profile = createResponse.data;
                if (!createResponse.success) {
                    return Promise.resolve(response_1.ResponseUtil.fail('Failed creating profile', createResponse));
                }
                return this.login(profile.externalID);
            });
        });
    }
}
exports.ProfileLogic = ProfileLogic;
//# sourceMappingURL=profile-logic.js.map