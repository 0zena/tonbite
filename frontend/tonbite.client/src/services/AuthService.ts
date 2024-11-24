import api from "./index.ts";
import RegisterFormState from "../states/RegisterFormState.ts";
import LoginFormState from "../states/LoginFormState.ts";

export default class AuthService {
    public static async Signup(form: RegisterFormState) {
        try {
            return await api.post("/user/register", form, {
                validateStatus: function (status) {
                    return status >= 200 && status < 300;
                }
            });
        } catch (error) {
            return  error;
        }
    }
    
    public static async Login(form: LoginFormState) {
        try {
            const result = await api.post("/user/login", form);
            localStorage.setItem("jwt", result.data.jwt);
        }
        catch (error) {
            return error;
        }
    }
}
