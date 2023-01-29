export class Config {

public static serverUrl: string;

public static _initialize() {
    if(process.env.NODE_ENV === "production") {
        Config.serverUrl = "https://galactic-vacations.herokuapp.com/"
    }else {
        Config.serverUrl = "http://localhost:3001/";
    }
}

    public vacationsUrl =  Config.serverUrl + "api/vacations/";
    public likedVacationsUrl = Config.serverUrl + "api/liked-vacations/";
    public vacationImagesUrl = Config.serverUrl + "api/vacations/images/";
    public registerUrl = Config.serverUrl + "api/auth/register/";
    public loginUrl = Config.serverUrl + "api/auth/login/";
    public usersUrl = Config.serverUrl + "api/users/";
}

Config._initialize();

const appConfig = new Config();

export default appConfig;
