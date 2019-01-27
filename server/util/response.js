"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseUtil {
    static succeed(data) {
        return {
            success: true,
            message: null,
            data: data,
        };
    }
    static fail(message, inner) {
        return {
            success: false,
            message: message,
            innerOperation: inner,
            data: null,
        };
    }
}
exports.ResponseUtil = ResponseUtil;
//# sourceMappingURL=response.js.map