import { z, ZodType } from "zod";

export enum Visibility {
    private = 0,
    public = 1,
}

export type CourseType = {
    id?: number;
    name: string;
    bio: string;
    walletAddress?: string;
    price?: number;
    created?: Date;
    userId?: number;
    visibility?: Visibility;
}

export const CourseSchema: ZodType<CourseType> = z.object({
    id: z.number().optional(),
    name: z.string().min(4).max(255, { message: "Course name cannot be longer than 255 symbols." }),
    bio: z.string().min(1, { message: "Course must have bio." }).max(1000, { message: "Course bio cannot be longer than 1000 symbols." }),
    walletAddress: z.string().max(256, { message: "TON wallet address can`t be that long." }).optional(),
    price: z.number({ message: "Please enter valid number." }).optional(),
    created: z.date().optional(),
    userId: z.number().optional(),
    visibility: z.nativeEnum(Visibility).optional(),
})