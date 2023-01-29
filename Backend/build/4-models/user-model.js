"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class UserModel {
    constructor(user) {
        this.userId = user.userId;
        this.role = user.role;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
    }
    validate() {
        var _a;
        const result = UserModel.validationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    }
}
UserModel.validationSchema = joi_1.default.object({
    userId: joi_1.default.number().forbidden().integer().positive(),
    role: joi_1.default.forbidden(),
    firstName: joi_1.default.string().required().min(2).max(20),
    lastName: joi_1.default.string().required().min(2).max(20),
    username: joi_1.default.string().required().min(5).max(20),
    password: joi_1.default.string().required().min(5).max(20)
});
exports.default = UserModel;
