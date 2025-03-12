import { CourseType } from "../states";
import { api } from "./Api.ts";

export class CourseService {
    public static async Create(form: CourseType): Promise<CourseType | undefined> {
        try {
            const result = await api.post("/courses", form);
            return result.data as CourseType;
        } catch {
            return undefined;
        }
    }

    public static async Get(id: string | undefined): Promise<CourseType | undefined> {
        try {
            const result = await api.get(`/courses/${id}`);
            return result.data as CourseType | undefined;
        } catch {
            return undefined;
        }
    }

    public static async Delete(id: string | undefined): Promise<string | undefined> {
        try {
            const result = await api.delete(`/courses/${id}`);
            return result.data;
        } catch {
            return undefined;
        }
    }
}