"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Brew_1 = require("./../../shared/models/Brew");
class MockBrewData {
    get(brewID) {
        return new Promise((resolve, reject) => {
            // TODO
            let testBRew = new Brew_1.Brew();
            testBRew.name = 'Test Brew';
            testBRew.id = brewID;
            return resolve({ success: true, data: testBRew });
        });
    }
    create(newBrew) {
        return new Promise((resolve, reject) => {
            // TODO
            return resolve({ success: true });
        });
    }
    update(updatedBrew) {
        return new Promise((resolve, reject) => {
            // TODO
            return resolve({ success: true });
        });
    }
}
exports.MockBrewData = MockBrewData;
//# sourceMappingURL=mock-brew-data.js.map