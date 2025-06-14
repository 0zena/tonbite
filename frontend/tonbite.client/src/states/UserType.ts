import { z, ZodType } from "zod";
import { CourseType } from "./Course.ts";
import { RoleType } from "./Role.ts";

export type UserType = {
    id?: number;
    email: string;
    username?: string;
    bio?: string;
    verified?: boolean;
    roles?: RoleType[];
    courses?: CourseType[];
}

export const UserSchema: ZodType<UserType> = z.object({
    id: z.number().optional(),
    email: z.string().email(),
    username: z.string().min(4).max(24).optional(),
    bio: z.string().min(0).max(1000).optional(),
    verified: z.boolean().optional()
});