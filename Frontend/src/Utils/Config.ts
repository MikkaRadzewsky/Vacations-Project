import { config } from "process";

export class Config {

public static serverUrl: string;

public static _initialize() {
    if(process.env.NODE_ENV === "production") {
        Config.serverUrl = "http://localhost:3001/"; //3000? 3001?
    }else {
        Config.serverUrl = "http://galactic-vacations.herokuapp.com"
    }
}

    // public vacationsUrl =  Config.serverUrl + "api/vacations/";
    // public likedVacationsUrl = Config.serverUrl + "api/liked-vacations/";
    // public vacationImagesUrl = Config.serverUrl + "api/vacations/images/";
    // public registerUrl = Config.serverUrl + "api/auth/register/";
    // public loginUrl = Config.serverUrl + "api/auth/login/";
    // public usersUrl = Config.serverUrl + "api/users/";
}

// const appConfig = new Config();

// export default appConfig;

Config._initialize();
