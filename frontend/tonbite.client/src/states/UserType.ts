import { z, ZodType } from "zod";

export type UserType = {
    id: number;
    email: string;
    username: string;
    bio: string;
}

export const UserSchema: ZodType<UserType> = z.object({
    id: z.number(),
    email: z.string().email(),
    username: z.string().min(4).max(24),
    bio: z.string().max(1000),
});