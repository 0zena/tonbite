import api from "./index.ts";
import { RegisterFormProps } from "../states/RegisterFormProps.ts";
import { LoginFormProps } from "../states/LoginFormProps.ts";
import axios from "axios";

export default class AuthService {
    public static async Register(form: RegisterFormProps) {
        try {
            return await api.post("/user/register", form);
        } catch (error) {
            return error;
        }
    }
    
    public static async Login(form: LoginFormProps) {
        try {
            const result = await api.post("/user/login", form);
            axios.defaults.headers.common["Authorization"] = "Bearer" + result.data.accessToken;
            localStorage.setItem("accessToken", result.data.accessToken);
        }
        catch (error) {
            console.error(error);
        }
    }

    public static async Logout() {
        try {
            await api.post("/user/logout");
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("accessToken");
        } catch (error) {
            console.error(error);
        }
    }

    public static async RefreshToken() : Promise<string | null> {
        try {
            const result = await api.post("/user/token/refresh")
            axios.defaults.headers.common["Authorization"] = "Bearer" + result.data.accessToken;
            localStorage.setItem("accessToken", result.data.accessToken);
            return result.data.accessToken;
        } catch {
            return null;
        }
    }
}
