"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const controller_base_1 = require("./controller-base");
class RecipeData extends controller_base_1.ResourceController {
    constructor() {
        super(...arguments);
        this.modelName = 'Recipe';
        this.model = mongoose.model('Recipe', new mongoose.Schema({
            id: { type: 'string', index: true },
            ownerProfileID: { type: 'string', index: true },
            name: { type: 'string' },
            description: { type: 'string' },
        }));
    }
    mapFromDocument(document) {
        return {
            id: document.get('id'),
            ownerProfileID: document.get('ownerProfileID'),
            name: document.get('name'),
            description: document.get('description'),
        };
    }
}
exports.RecipeData = RecipeData;
//# sourceMappingURL=recipe-data.js.map