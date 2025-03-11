import { z, ZodType } from "zod";

export type RoleType = {
    id?: number;
    name: string;
    userId?: number;
}

export const RoleSchema: ZodType<RoleType> = z.object({
    id: z.number().optional(),
    name: z.string().min(4).max(255),
    userId: z.number().optional(),
})