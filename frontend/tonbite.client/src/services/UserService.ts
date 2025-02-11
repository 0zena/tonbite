import { UserType } from "../states";
import { api } from "./index.ts";

export class UserService {
    public static async Get() : Promise<UserType | undefined> {
        try {
            const response = await api.get("/user");
            return response.data as UserType;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
}