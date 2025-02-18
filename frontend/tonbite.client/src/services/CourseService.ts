import { CourseType } from "../states";
import { api } from "./Api.ts";
import { HTTPResponseHandler } from "./extensions/HTTPResponseHandler.ts";

export class CourseService {
    public static async Create(form: CourseType): Promise<string> {
        try {
            const result = await api.post("/courses", form);
            return result.data as string;
        } catch (error: unknown) {
            return HTTPResponseHandler.HandleError(error);
        }
    }
}