import { CourseType } from "../states";
import { api } from "./Api.ts";

export class CourseService {
    public static async create(form: CourseType): Promise<CourseType | undefined> {
        try {
            const result = await api.post("/courses", form);
            return result.data as CourseType;
        } catch {
            return undefined;
        }
    }

    public static async get(id: string | undefined): Promise<CourseType | undefined> {
        try {
            const result = await api.get(`/courses/${id}`);
            return result.data as CourseType | undefined;
        } catch {
            return undefined;
        }
    }

    public static async update(form: CourseType): Promise<CourseType | undefined> {
        try {
            const result = await api.put(`/courses/${form.id}`, form);
            return result.data as CourseType | undefined;
        } catch {
            return undefined;
        }
    }

    public static async delete(id: string | undefined): Promise<string | undefined> {
        try {
            const result = await api.delete(`/courses/${id}`);
            return result.data;
        } catch {
            return undefined;
        }
    }
}