import { UserType } from "../states";
import { api } from "./index.ts";

export class UserService {
    public static async Get() : Promise<UserType | undefined> {
        try {
            const response = await api.get("/user");
            return response.data as UserType;
        } catch {
            return undefined;
        }
    }

    public static async Update(form: UserType) : Promise<string | undefined> {
        try {
            const response = await api.patch("/user", form);
            return response.data;
        } catch {
            return undefined;
        }
    }
}