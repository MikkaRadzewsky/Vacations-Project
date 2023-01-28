import axios from 'axios';
import {Config} from '../Utils/Config';
import { AuthActionType, authStore } from '../Redux/AuthState';
import UserModel from "../Models/UserModel";
import CredentialsModel from '../Models/CredentialsModel';
import jwtDecode from "jwt-decode";
import { resolve } from 'path';

class AuthService {

    public async register(user: UserModel): Promise<void> {
        
        const response = await axios.post<string>(Config.serverUrl+"/api/register/", user);

        const token = response.data;
        authStore.dispatch({ type: AuthActionType.Register, payload: token });
    }

    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<string>(Config.serverUrl+"/api/login/", credentials);
        const token = response.data;
        authStore.dispatch({ type: AuthActionType.Login, payload: token });
    }

    public logout(): void {
        authStore.dispatch({ type: AuthActionType.Logout });
    }

    public isLoggedIn(): boolean {
        return authStore.getState().token !== null;
    }

    public async getOneUser(id: number): Promise<UserModel> {
        const response = await axios.get<UserModel>(Config.serverUrl+"/api/users/"+ id);
        const user = response.data;
        return user;
    }


    public async getUserIdFromToken(): Promise<number>{
        const token = authStore.getState().token;
        if(!token){return 0};
        const decodedToken = await jwtDecode(token);
        const userId = Promise.resolve((decodedToken as any).user.userId);
        return userId;
    }

    public async isAdmin(): Promise<boolean>{    
        const userId = await this.getUserIdFromToken();

        if(userId===0) return false;
        const user = this.getOneUser(userId);
        const role = (await user).role;
        if(role==="Admin") return true;
        return false;
    }

}

const authService = new AuthService();

export default authService;