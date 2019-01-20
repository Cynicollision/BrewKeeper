"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uniqid = require("uniqid");
class ID {
    static new(type) {
        return (type || 'XX') + uniqid();
    }
}
exports.ID = ID;
//# sourceMappingURL=object-id.js.map