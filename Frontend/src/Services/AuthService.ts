import axios from "axios";
import { AuthActionType, authStore } from "../Redux/AuthState";
import CredentialsModel from "../Models/credentials-model";
import UserModel from "../Models/user-model";
import appConfig from "../Utils/AppConfig";

class AuthService {

    public async register(user:UserModel): Promise<void> {
        const response = await axios.post<string>(appConfig.registerUrl, user);
        const token = response.data;
        authStore.dispatch({ type: AuthActionType.Login, payload: token });
    }

    public async Login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<string>(appConfig.loginUrl, credentials);
        const token = response.data;
        authStore.dispatch({ type: AuthActionType.Register, payload: token });
    }

    public logout(): void {
        authStore.dispatch({ type: AuthActionType.Logout });
    }

    public isLoggedIn(): boolean {
        return authStore.getState().token !== null;
    }


}

const authService = new AuthService();

export default authService;
