"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const jwtSecretKey = "WhyDidTheyBringBackPalpatine";
function getNewToken(user) {
    delete user.password;
    const container = { user };
    const options = { expiresIn: "3h" };
    const token = jsonwebtoken_1.default.sign(container, jwtSecretKey, options);
    return token;
}
function verifyToken(request) {
    return new Promise((resolve, reject) => {
        try {
            const header = request.header("authorization");
            if (!header) {
                resolve(false);
                return;
            }
            const token = header.substring(7);
            if (!token) {
                resolve(false);
                return;
            }
            jsonwebtoken_1.default.verify(token, jwtSecretKey, err => {
                if (err) {
                    resolve(false);
                    return;
                }
                resolve(true);
            });
        }
        catch (err) {
            reject(err);
        }
    });
}
const salt = "ThePrequelsAreBetter";
function hash(plainText) {
    if (!plainText)
        return null;
    // Hash with salt: 
    const hashedText = crypto_1.default.createHmac("sha512", salt).update(plainText).digest("hex");
    return hashedText;
}
exports.default = {
    getNewToken,
    verifyToken,
    hash
};
