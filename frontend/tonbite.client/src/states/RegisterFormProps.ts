import { z, ZodType } from "zod";

export type RegisterFormProps = {
    email: string;
    password: string;
    confirmPassword: string;
}

export const RegisterFormSchema : ZodType<RegisterFormProps> = z.object({
    email: z.string().email(),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .max(255, { message: "Password can not be longer then 255 characters." }),
    confirmPassword: z.string(),
}).refine((props) => props.password === props.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});