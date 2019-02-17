"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_type_1 = require("../enum/object-type");
const object_id_1 = require("../util/object-id");
const response_1 = require("../util/response");
class ProfileLogic {
    constructor(brewData, profileData, recipeData) {
        this.brewData = brewData;
        this.profileData = profileData;
        this.recipeData = recipeData;
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
            return Promise.resolve(response_1.ResponseUtil.fail('Couldn\'t register: External ID and User Name are required.'));
        }
        return this.profileData.getByExternalID(externalID).then(response => {
            if (response.success) {
                return Promise.resolve(response_1.ResponseUtil.fail('Profile already exists with that External ID.'));
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
    getProfileData(externalID, profileID) {
        if (!externalID || !profileID) {
            return Promise.resolve(response_1.ResponseUtil.fail('Couldn\'t retrieve profile data: External ID and Profile ID are required.'));
        }
        return this.checkUserOwnsProfile(externalID, profileID).then(isOwner => {
            if (!isOwner) {
                return Promise.resolve(response_1.ResponseUtil.fail('Couldn\'t retrieve profile data: Not logged in as claimed profile owner.'));
            }
            return this.recipeData.getByOwnerID(profileID).then(recipeResponse => {
                return this.brewData.getByOwnerID(profileID).then(brewResponse => {
                    return {
                        success: true,
                        data: {
                            brews: brewResponse.data,
                            recipes: recipeResponse.data,
                        },
                    };
                });
            });
        });
    }
    checkUserOwnsProfile(externalID, profileID) {
        return this.profileData.getByExternalID(externalID).then(response => {
            return response && response.success && response.data.id === profileID;
        });
    }
}
exports.ProfileLogic = ProfileLogic;
//# sourceMappingURL=profile-logic.js.map