"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Brew_1 = require("./../../shared/models/Brew");
class BrewData {
    get(brewID) {
        return new Promise((resolve, reject) => {
            // TODO
            let testBrew = new Brew_1.Brew();
            testBrew.name = 'Test Brew';
            testBrew.id = brewID;
            return resolve({ success: true, data: testBrew });
        });
    }
    create(newBrew) {
        return new Promise((resolve, reject) => {
            // TODO
            return resolve({ success: true, data: newBrew });
        });
    }
    update(updatedBrew) {
        return new Promise((resolve, reject) => {
            // TODO
            return resolve({ success: true, data: updatedBrew });
        });
    }
}
exports.BrewData = BrewData;
//# sourceMappingURL=brew-data.js.map