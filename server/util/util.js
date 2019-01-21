"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseUtil {
    succeed(data) {
        return {
            success: true,
            message: null,
            data: data,
        };
    }
    fail(message) {
        return {
            success: false,
            message: message,
            data: null,
        };
    }
}
exports.ResponseUtil = ResponseUtil;
//# sourceMappingURL=util.js.map