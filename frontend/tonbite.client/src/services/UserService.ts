import { CourseType, UserType, UserCourseStatus } from "../states";
import { api } from "./index.ts";

export class UserService {
    public static async get(includeRoles = false) : Promise<UserType | undefined> {
        try {
            const response = await api.get("/user", {
                params: {
                    roles: includeRoles,
                }
            });
            return response.data as UserType;
        } catch {
            return undefined;
        }
    }

    public static async getById(id: number): Promise<UserType | undefined> {
        try {
            const response = await api.get(`/user/${id}`);
            return response.data as UserType;
        } catch {
            return undefined;
        }
    }

    public static async searchUsers(key: string) : Promise<UserType[] | undefined> {
        try {
            const response = await api.get(`/user/search`, {
                params: {
                    key: key,
                }
            });
            return response.data as UserType[];
        } catch {
            return undefined;
        }
    }

    public static async update(form: UserType) : Promise<UserType | undefined> {
        try {
            const response = await api.put("/user", form);
            return response.data as UserType | undefined;
        } catch {
            return undefined;
        }
    }

    public static async getCourses(id: number | undefined, status: UserCourseStatus): Promise<CourseType[] | undefined> {
        try {
            const result = await api.get(`/user/${id}/courses`, {
                params: {
                    status: status,
                }
            });
            return result.data as CourseType[] | undefined;
        } catch {
            return undefined;
        }
    }

    public static async getSoldCoursesCount() : Promise<number | undefined> {
        try {
            const result = await api.get("/user/sold/count");
            return result.data as number | undefined;
        } catch {
            return undefined;
        }
    }

    public static async delete(id: number) : Promise<void> {
        try {
            await api.delete(`/user/${id}`);
        } catch {
            return undefined;
        }
    }
}