"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logic_base_1 = require("./../logic/logic-base");
class MockResourceLogic extends logic_base_1.ResourceLogic {
    constructor(brewData, profileData) {
        let config = { name: 'Test', objectType: 'TEST' };
        super(brewData, profileData, config);
    }
}
exports.MockResourceLogic = MockResourceLogic;
//# sourceMappingURL=mock-logic.js.map