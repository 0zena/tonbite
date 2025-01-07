import api from "./index.ts";
import RegisterFormState from "../states/RegisterFormState.ts";
import LoginFormState from "../states/LoginFormState.ts";
import UserState from "../states/UserState.ts";

export default class AuthService {
    public static async Signup(form: RegisterFormState) {
        try {
            return await api.post("/user/register", form);
        } catch (error) {
            return error;
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

    public static async GetUser() : Promise<UserState> {
        const jwt = localStorage.getItem("jwt");
        return await api.get("/user", { headers: { "Authorization": "Bearer " + jwt }})
    }
}
