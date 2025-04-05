import { z, ZodType } from "zod";
import { CourseStepType } from "./CourseStep.ts";
import { UserCourseType } from "./UserCourse.ts";

export enum Visibility {
    private = 0,
    public = 1,
}

export function copyFrom(source: CourseType, target: CourseType) {
    source.name = target.name;
    source.bio = target.bio;
    source.walletAddress = target.walletAddress;
    source.price = target.price;
}

export type CourseType = {
    id?: number;
    name: string;
    bio: string;
    walletAddress?: string;
    price?: number;
    created?: string;
    visibility?: Visibility;
    steps?: CourseStepType[];
    users?: UserCourseType[];
}

export const CourseSchema: ZodType<CourseType> = z.object({
    id: z.number().optional(),
    name: z.string()
        .min(4, { message: "Course title must be at least 4 characters." })
        .max(255, { message: "Course name cannot be longer than 255 symbols." }),
    bio: z.string()
        .min(1, { message: "Course must have bio." })
        .max(1000, { message: "Course bio cannot be longer than 1000 symbols." }),
    walletAddress: z.string().max(256, { message: "TON wallet address can`t be that long." }).optional(),
    price: z.number({ message: "Please enter valid number." }).optional(),
    created: z.string().optional(),
    userId: z.number().optional(),
    visibility: z.nativeEnum(Visibility).optional(),
})