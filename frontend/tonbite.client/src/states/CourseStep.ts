import { z, ZodType } from "zod";

export function copyCoursStepFrom(source: CourseStepType, target: CourseStepType) {
    source.name = target.name;
    source.bio = target.bio;
    source.content = target.content;
}

export type CourseStepType = {
    id?: number;
    parentId?: number;
    name: string;
    bio: string;
    content: string;
    created?: Date;
}

export const CourseStepSchema: ZodType<CourseStepType> = z.object({
    id: z.number().optional(),
    parentId: z.number().optional(),
    name: z.string()
        .min(4, { message: "Course Step name must be at least 4 chars long." })
        .max(255, { message: "Course Step name cannot be longer than 255 symbols." }),
    bio: z.string()
        .min(1, { message: "Course Step must have bio." })
        .max(1000, { message: "Course Step bio cannot be longer than 1000 symbols." }),
    content: z.string()
        .min(1, { message: "Course Step must have learning content." })
        .max(20000, { message: "Course Step learning content cannot be longer than 20000 symbols." }),
    created: z.date().optional(),
})