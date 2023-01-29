"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../2-utils/logger"));
function catchAll(err, request, response, next) {
    console.log(err);
    (0, logger_1.default)(err.message);
    response.status(err.status || 500).send(err.message);
}
exports.default = catchAll;
