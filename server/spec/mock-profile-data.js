"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MockProfileData {
    get(id) {
        return new Promise((resolve, reject) => {
            let testProfile = { id: id, externalID: 'Test External ID', name: 'Test Profile' };
            return resolve({ success: true, data: testProfile });
        });
    }
    getByExternalID(externalID) {
        return new Promise((resolve, reject) => {
            let testProfile = { id: 'Test ID', externalID: externalID, name: 'Test Profile' };
            return resolve({ success: true, data: testProfile });
        });
    }
    create(data) {
        return new Promise((resolve, reject) => {
            // TODO
            return resolve({ success: true, data: data });
        });
    }
    update(id, data) {
        return new Promise((resolve, reject) => {
            // TODO
            return resolve({ success: true, data: data });
        });
    }
}
exports.MockProfileData = MockProfileData;
//# sourceMappingURL=mock-profile-data.js.map