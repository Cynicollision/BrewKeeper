"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logic_base_1 = require("./logic-base");
const object_type_1 = require("../enum/object-type");
class RecipeLogic extends logic_base_1.ResourceLogic {
    constructor(recipeData, profileData) {
        let config = { name: 'Recipe', objectType: object_type_1.ObjectType.Recipe };
        super(recipeData, profileData, config);
    }
}
exports.RecipeLogic = RecipeLogic;
//# sourceMappingURL=recipe-logic.js.map