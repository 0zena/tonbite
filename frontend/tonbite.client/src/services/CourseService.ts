import {CourseType, Pagination, UserCourseType} from "../states";
import { api } from "./Api.ts";
import { Visibility } from "../states/Course.ts";
import {SortProps} from "./extensions/SortProps.ts";
import {FilterProps} from "./extensions/FilterProps.ts";

export class CourseService {
    public static async create(form: CourseType): Promise<CourseType | undefined> {
        try {
            const result = await api.post("/courses", form);
            return result.data as CourseType;
        } catch {
            return undefined;
        }
    }

    public static async get(id: string | undefined, includeSteps = false): Promise<CourseType | undefined> {
        try {
            const result = await api.get(`/courses/${id}`,
            {
                params: {
                    steps: includeSteps,
                },
            });
            return result.data as CourseType | undefined;
        } catch {
            return undefined;
        }
    }

    public static async getList(sort: SortProps, filter: FilterProps): Promise<Pagination<CourseType> | undefined> {
        try {
            const result = await api.get("courses", {
                params: {
                    ...sort,
                    ...filter,
                },
            });
            return result.data as Pagination<CourseType> | undefined;
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

    public static async purchase(id: string | undefined): Promise<UserCourseType | undefined> {
        try {
            const result = await api.post(`/courses/${id}/purchase`);
            return result.data as UserCourseType | undefined;
        } catch {
            return undefined;
        }
    }

    public static async changeVisibility(id: string | undefined, visibility: Visibility): Promise<CourseType | undefined> {
        try {
            const result = await api.put(`/courses/${id}/visibility/change`, {}, {
                params: {
                    visibility: visibility,
                }
            });
            return result.data as CourseType | undefined;
        } catch {
            return undefined;
        }
    }
}