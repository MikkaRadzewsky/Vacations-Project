class AppConfig {

    // Database: 
    public host = "eu-cdbr-west-03.cleardb.net"; 
    public user = "bfe1698707d378"; 
    public password = "6c05edd8"; 
    public database = "heroku_e30d8519ef42519";

    // Server port: 
    public port = 3001;

}

const appConfig = new AppConfig();

export default appConfig;