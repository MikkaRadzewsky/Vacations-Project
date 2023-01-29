"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppConfig {
}
class DevelopmentConfig extends AppConfig {
    constructor() {
        super(...arguments);
        // Database: 
        this.isDevelopment = true;
        this.isProduction = false;
        this.host = "localhost";
        this.user = "root";
        this.password = "";
        this.database = "vacationsProject";
        this.frontEndUrl = "http://localhost:3000/";
        // Server port: 
        this.port = 3001;
    }
}
class ProductionConfig extends AppConfig {
    constructor() {
        super(...arguments);
        // Database: 
        this.isDevelopment = false;
        this.isProduction = true;
        this.host = "eu-cdbr-west-03.cleardb.net";
        this.user = "b1fead33ffdb2c";
        this.password = "4353bcc7";
        this.database = "heroku_089154aa81c8c9b";
    }
}
const appConfig = process.env.NODE_ENV === "production" ? new ProductionConfig() : new DevelopmentConfig();
exports.default = appConfig;
