import { api } from "./Api.ts";
import { CourseStepType } from "../states";

export class CourseStepService {
    public static async create(form: CourseStepType): Promise<CourseStepType | undefined> {
        try {
            const result = await api.post("/course-steps", form);
            return result.data as CourseStepType;
        } catch {
            return undefined;
        }
    }

    public static async get(id: string | undefined): Promise<CourseStepType | undefined> {
        try {
            const result = await api.get(`/course-steps/${id}`);
            return result.data as CourseStepType;
        } catch {
            return undefined;
        }
    }
}