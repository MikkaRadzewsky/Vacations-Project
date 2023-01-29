"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig = /** @class */ (function () {
    function AppConfig() {
        // Database: 
        this.host = "eu-cdbr-west-03.cleardb.net";
        this.user = "bfe1698707d378";
        this.password = "6c05edd8";
        this.database = "heroku_e30d8519ef42519";
        // Server port: 
        this.port = 3001;
    }
    return AppConfig;
}());
var appConfig = new AppConfig();
exports.default = appConfig;
