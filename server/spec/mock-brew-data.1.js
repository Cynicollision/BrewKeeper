"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MockBrewData {
    get(brewID) {
        return new Promise((resolve, reject) => {
            let testBrew = { id: brewID, name: 'Test Brew' };
            return resolve({ success: true, data: testBrew });
        });
    }
    getByOwnerID(ownerProfileID) {
        return new Promise((resolve, reject) => {
            let testBrews = ['123', 'abc', '4f0'].map(id => {
                return { id: id, ownerProfileID: ownerProfileID, name: 'Brew ' + id };
            });
            return resolve({ success: true, data: testBrews });
        });
    }
    create(newBrew) {
        return new Promise((resolve, reject) => {
            // TODO
            return resolve({ success: true, data: newBrew });
        });
    }
    update(brewID, updatedBrew) {
        return new Promise((resolve, reject) => {
            // TODO
            return resolve({ success: true });
        });
    }
}
exports.MockBrewData = MockBrewData;
//# sourceMappingURL=mock-brew-data.1.js.map