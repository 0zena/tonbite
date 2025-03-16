import { api } from "./index.ts";
import { RegisterFormProps, LoginFormProps,ChangePasswordProps } from "../states";
import { HTTPResponseHandler } from "./extensions/HTTPResponseHandler.ts";

export class AuthService {
    public static async register(form: RegisterFormProps) {
        try {
            await api.post("/user/register", form);
            return undefined;
        } catch (error) {
            return HTTPResponseHandler.handleError(error);
        }
    }

    public static async login(form: LoginFormProps) {
        try {
            const result = await api.post("/user/login", form);
            api.defaults.headers.common = { "Authorization": "Bearer " + result.data.accessToken };
            localStorage.setItem("accessToken", result.data.accessToken);
            return undefined;
        } catch (error: unknown) {
            return HTTPResponseHandler.handleError(error);
        }
    }

    public static async logout() {
        // TODO: refactor request
        try {
            await api.post("/user/logout");
            delete api.defaults.headers.common["Authorization"];
            localStorage.removeItem("accessToken");
        } catch {
            return;
        }
    }

    public static async refreshToken() : Promise<string | null> {
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

    public static async changePassword(form: ChangePasswordProps): Promise<string | undefined> {
        try {
            const response = await api.put("/user/password/change", form);
            return response.data;
        } catch (error: unknown) {
            return HTTPResponseHandler.handleError(error);
        }
    }

    public static async becomeCreator(id: number) {
        await api.post(`/user/${id}/role/creator`);
    }
}
