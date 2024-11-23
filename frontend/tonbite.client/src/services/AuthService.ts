import api from "./index.ts";
import RegisterFormState from "../states/RegisterFormState.ts";
import LoginFormState from "../states/LoginFormState.ts";

export default class AuthService {
    public static async Signup(form: RegisterFormState) {
        try {
            return await api.post("/user/register", form);
        }
        catch (error) {
            return error;
        }
    }
    
    public static async Login(form: LoginFormState) {
        try {
            return await api.post("/login", form);
        }
        catch (error) {
            return error;
        }
    }
}
