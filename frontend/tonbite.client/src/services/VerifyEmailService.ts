import { UserType } from "../states";
import { api } from "./index.ts";

export class VerifyEmailService {
    public static async verifyEmail(email: string, code: string) : Promise<UserType | undefined>{
        try {
            const response = await api.post("/verify-email", { email, code });
            return response.data as UserType;
        } catch {
            return undefined;
        }
    }
}