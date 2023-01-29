"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig = /** @class */ (function () {
    function AppConfig() {
        // Database: 
        this.host = "localhost";
        this.user = "root";
        this.password = "";
        this.database = "vacationsProject";
        // Server port: 
        this.port = 3001;
    }
    return AppConfig;
}());
var appConfig = new AppConfig();
exports.default = appConfig;
