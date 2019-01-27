"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MockBrewData {
    constructor() {
        this.collection = [];
    }
    setCollection(brews) {
        this.collection = brews;
    }
    get(brewID) {
        return new Promise((resolve, reject) => {
            let testBrew = { id: brewID, name: 'Test Brew' };
            return resolve({ success: true, data: testBrew });
        });
    }
    getByOwnerID(ownerProfileID) {
        return new Promise((resolve, reject) => {
            return resolve({ success: true, data: this.collection });
        });
    }
    create(newBrew) {
        return new Promise((resolve, reject) => {
            return resolve({ success: true, data: newBrew });
        });
    }
    update(brewID, updatedBrew) {
        return new Promise((resolve, reject) => {
            return resolve({ success: true, data: updatedBrew });
        });
    }
}
exports.MockBrewData = MockBrewData;
//# sourceMappingURL=mock-brew-data.js.map