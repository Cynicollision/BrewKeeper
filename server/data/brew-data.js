"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const controller_base_1 = require("./controller-base");
class BrewData extends controller_base_1.ResourceController {
    constructor() {
        super(...arguments);
        this.modelName = 'Brew';
        this.model = mongoose.model('Brew', new mongoose.Schema({
            id: { type: 'string', index: true },
            ownerProfileID: { type: 'string', index: true },
            name: { type: 'string' },
            recipeID: { type: 'string' },
            brewDate: { type: 'string' },
            bottleDate: { type: 'string' },
            chillDate: { type: 'string' },
            notes: { type: 'string' },
        }));
    }
    mapFromDocument(document) {
        return {
            id: document.get('id'),
            ownerProfileID: document.get('ownerProfileID'),
            name: document.get('name'),
            recipeID: document.get('recipeID'),
            brewDate: document.get('brewDate'),
            bottleDate: document.get('bottleDate'),
            chillDate: document.get('chillDate'),
            notes: document.get('notes'),
        };
    }
}
exports.BrewData = BrewData;
//# sourceMappingURL=brew-data.js.map