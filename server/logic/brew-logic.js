"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ObjectIDType_1 = require("./../../shared/enum/ObjectIDType");
const object_id_1 = require("./../util/object-id");
class BrewLogic {
    constructor(brewData) {
        this.brewData = brewData;
    }
    get(brewID) {
        return new Promise((resolve, reject) => {
            // validate the request
            if (!brewID) {
                resolve({ success: false, message: 'Couldn\'t fetch brew: ID is required.' });
                return;
            }
            return this.brewData.get(brewID)
                .then(response => {
                resolve({
                    success: response.success,
                    message: response.message,
                    data: response.data,
                });
            });
        });
    }
    create(newBrew) {
        return new Promise((resolve, reject) => {
            // validate the request
            if (!newBrew || !newBrew.name) {
                resolve({ success: false, message: 'Couldn\'t create brew: Name is required.' });
                return;
            }
            newBrew.id = object_id_1.ID.new(ObjectIDType_1.ObjectIDType.Brew);
            return this.brewData.create(newBrew)
                .then(response => resolve({
                success: response.success,
                message: response.message,
                data: response.data,
            }));
        });
    }
    update(newBrew) {
        return new Promise((resolve, reject) => {
            // validate the request
            if (!newBrew || !newBrew.name) {
                resolve({ success: false, message: 'Couldn\'t update brew: Name is required.' });
                return;
            }
            return this.brewData.update(newBrew)
                .then(response => resolve({
                success: response.success,
                message: response.message,
                data: response.data,
            }));
        });
    }
}
exports.BrewLogic = BrewLogic;
//# sourceMappingURL=brew-logic.js.map