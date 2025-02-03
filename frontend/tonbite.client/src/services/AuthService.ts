import { api } from "./index.ts";
import { RegisterFormProps } from "../states/RegisterFormProps.ts";
import { LoginFormProps } from "../states/LoginFormProps.ts";
import {ChangePasswordProps} from "../states/ChangePasswordProps.ts";
import axios from "axios";

export class AuthService {
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
            api.defaults.headers.common = { "Authorization": "Bearer " + result.data.accessToken };
            localStorage.setItem("accessToken", result.data.accessToken);
        }
        catch (error) {
            console.error(error);
        }
    }

    public static async Logout() {
        try {
            await api.post("/user/logout");
            delete api.defaults.headers.common["Authorization"];
            localStorage.removeItem("accessToken");
        } catch (error) {
            console.error(error);
        }
    }

    public static async RefreshToken() : Promise<string | null> {
        try {
            const result = await api.post("/user/token/refresh")
            api.defaults.headers.common = { "Authorization": "Bearer " + result.data.accessToken };
            localStorage.setItem("accessToken", result.data.accessToken);
            return result.data.accessToken;
        } catch {
            return null;
        }
    }

    public static async ChangePassword(form: ChangePasswordProps): Promise<string | undefined> {
        try {
            const response = await api.post("/user/password/change", form);
            return response.data;
        } catch (error: unknown) {
            console.log("error");
            if (axios.isAxiosError(error) && error.response) {
                return error.response.data || "An error occurred";
            }

            return "An unknown error occurred";
        }
    }
}
