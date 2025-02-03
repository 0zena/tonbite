import UserProps from "../states/UserProps.ts";
import { api } from "./index.ts";

export class UserService {
    public static async Get() : Promise<UserProps | undefined> {
        try {
            const response = await api.get("/user");
            return response.data as UserProps;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
}