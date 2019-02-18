"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logic_base_1 = require("./logic-base");
const object_type_1 = require("../enum/object-type");
class BrewLogic extends logic_base_1.ResourceLogic {
    constructor(brewData, profileData) {
        let config = { name: 'Brew', objectType: object_type_1.ObjectType.Brew };
        super(brewData, profileData, config);
    }
}
exports.BrewLogic = BrewLogic;
//# sourceMappingURL=brew-logic.js.map