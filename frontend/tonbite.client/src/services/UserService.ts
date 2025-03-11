import {CourseType, UserType} from "../states";
import { api } from "./index.ts";

export class UserService {
    public static async Get(includeCourses = false, includeRoles = false) : Promise<UserType | undefined> {
        try {
            const response = await api.get("/user", {
                params: {
                    courses: includeCourses,
                    roles: includeRoles,
                }
            });
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

    public static async GetCourses(id: number | undefined): Promise<CourseType[] | undefined> {
        try {
            const result = await api.get(`/user/${id}/courses`);
            return result.data as CourseType[] | undefined;
        } catch {
            return undefined;
        }
    }
}