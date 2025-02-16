import { api } from "./index.ts";
import { RegisterFormProps, LoginFormProps,ChangePasswordProps } from "../states";
import { HTTPResponseHandler } from "./extensions/HTTPResponseHandler.ts";

export class AuthService {
    public static async Register(form: RegisterFormProps) {
        try {
            await api.post("/user/register", form);
            return undefined;
        } catch (error) {
            return HTTPResponseHandler.HandleError(error);
        }
    }

    public static async Login(form: LoginFormProps) {
        try {
            const result = await api.post("/user/login", form);
            api.defaults.headers.common = { "Authorization": "Bearer " + result.data.accessToken };
            localStorage.setItem("accessToken", result.data.accessToken);
            return undefined;
        } catch (error: unknown) {
            return HTTPResponseHandler.HandleError(error);
        }
    }

    public static async Logout() {
        // TODO: refactor request
        try {
            await api.post("/user/logout");
            delete api.defaults.headers.common["Authorization"];
            localStorage.removeItem("accessToken");
        } catch {
            return;
        }
    }

    public static async RefreshToken() : Promise<string | null> {
        // TODO: refactor request
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
            const response = await api.put("/user/password/change", form);
            return response.data;
        } catch (error: unknown) {
            return HTTPResponseHandler.HandleError(error);
        }
    }
}
