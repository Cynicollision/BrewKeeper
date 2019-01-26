"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MockProfileData {
    constructor() {
        this.testExternalID = 'Test External ID';
        this.testProfileID = 'Test Profile ID';
        this.testProfileName = 'Test Profile Name';
    }
    get(id) {
        return new Promise((resolve, reject) => {
            let testProfile = { id: id, externalID: this.testExternalID, name: this.testProfileName };
            return resolve({ success: true, data: testProfile });
        });
    }
    getByExternalID(externalID) {
        return new Promise((resolve, reject) => {
            let testProfile = { id: this.testProfileID, externalID: externalID, name: this.testProfileName };
            return resolve({ success: true, data: testProfile });
        });
    }
    create(data) {
        return new Promise((resolve, reject) => {
            return resolve({ success: true, data: data });
        });
    }
    update(id, data) {
        return new Promise((resolve, reject) => {
            return resolve({ success: true, data: data });
        });
    }
}
exports.MockProfileData = MockProfileData;
//# sourceMappingURL=mock-profile-data.js.map