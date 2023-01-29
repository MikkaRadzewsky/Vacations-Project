"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dal_1 = __importDefault(require("../2-utils/dal"));
const cyber_1 = __importDefault(require("../2-utils/cyber"));
const error_models_1 = require("../4-models/error-models");
const role_model_1 = __importDefault(require("../4-models/role-model"));
// Register:
function register(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const error = user.validate();
        if (error)
            throw new error_models_1.ValidationErrorModel(error);
        if (yield isUsernameTaken(user.username))
            throw new error_models_1.ValidationErrorModel(`Username ${user.username} already taken`);
        user.password = cyber_1.default.hash(user.password);
        user.role = role_model_1.default.User;
        const sql = `INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, ?)`;
        const result = yield dal_1.default.execute(sql, [user.role, user.firstName, user.lastName, user.username, user.password]);
        user.userId = result.insertId;
        const token = cyber_1.default.getNewToken(user);
        return token;
    });
}
//Login:
function login(credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        const error = credentials.validate();
        if (error)
            throw new error_models_1.ValidationErrorModel(error);
        credentials.password = cyber_1.default.hash(credentials.password);
        const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
        const users = yield dal_1.default.execute(sql, [credentials.username, credentials.password]);
        if (users.length === 0)
            throw new error_models_1.UnauthorizedErrorModel("Incorrect username or password");
        const user = users[0];
        const token = cyber_1.default.getNewToken(user);
        return token;
    });
}
//Is username taken:
function isUsernameTaken(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT COUNT(*) FROM users WHERE username = ?`;
        const count = yield dal_1.default.execute(sql, [username])[0];
        return count > 0;
    });
}
//Get one user:
function getOneUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT * FROM users WHERE userId = ?`;
        const users = yield dal_1.default.execute(sql, [id]);
        if (users.length === 0)
            throw new error_models_1.ResourceNotFoundErrorModel(id);
        const user = users[0];
        return user;
    });
}
exports.default = {
    register,
    login,
    getOneUser
};
