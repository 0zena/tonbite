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
    name: z.string().min(4).max(255),
    bio: z.string().min(1).max(1000),
    walletAddress: z.string().max(256).optional(),
    price: z.number().optional(),
    created: z.date().optional(),
    userId: z.number().optional(),
    visibility: z.nativeEnum(Visibility).optional(),
})