class AppConfig {
}

class DevelopmentConfig extends AppConfig {

    // Database: 
    public isDevelopment = true;
    public isProduction = false;
    public host = "localhost"; 
    public user = "root"; 
    public password = ""; 
    public database = "vacationsProject";
    public frontEndUrl = "http://localhost:3000/";
    // Server port: 
    public port = 3001;

}

class ProductionConfig extends AppConfig{

        // Database: 
        public isDevelopment = false;
        public isProduction = true;
        public host = "eu-cdbr-west-03.cleardb.net"; 
        public user = "b1fead33ffdb2c"; 
        public password = "4353bcc7"; 
        public database = "heroku_089154aa81c8c9b";
}

const appConfig = process.env.NODE_ENV === "production" ? new ProductionConfig() : new DevelopmentConfig();

export default appConfig;