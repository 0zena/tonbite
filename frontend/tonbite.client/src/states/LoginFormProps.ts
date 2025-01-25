import { z, ZodType } from "zod";

export type LoginFormProps = {
    email: string;
    password: string;
}

export const LoginFormSchema : ZodType<LoginFormProps> = z.object(
{
    email: z.string().email(),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .max(255, { message: "Password can not be longer then 255 characters." }),
});
