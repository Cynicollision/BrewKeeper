"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MockDataController {
    constructor() {
        this.collection = [];
    }
    setCollection(data) {
        this.collection = data;
    }
    get(id) {
        return new Promise((resolve, reject) => {
            let testRecipe = { id: id, name: 'Test Recipe' };
            return resolve({ success: true, data: testRecipe });
        });
    }
    getByOwnerID(ownerProfileID) {
        return new Promise((resolve, reject) => {
            return resolve({ success: true, data: this.collection });
        });
    }
    create(data) {
        return new Promise((resolve, reject) => {
            return resolve({ success: true, data: data });
        });
    }
    update(id, updatedBrew) {
        return new Promise((resolve, reject) => {
            return resolve({ success: true, data: updatedBrew });
        });
    }
    delete(id) {
        return Promise.resolve({ success: true });
    }
}
exports.MockDataController = MockDataController;
//# sourceMappingURL=mock-data.js.map