import { z, ZodType } from "zod";

export type ChangePasswordProps = {
    newPassword: string,
    password: string,
    confirmPassword: string,
}

export const ChangePasswordSchema : ZodType<ChangePasswordProps> = z.object({
   newPassword: z.string()
       .min(8, { message: "Password must be at least 8 characters long." })
       .max(255, { message: "Password can not be longer then 255 characters." }),
   password: z.string(),
   confirmPassword: z.string()
       .min(8, { message: "Password must be at least 8 characters long." })
       .max(255, { message: "Password can not be longer then 255 characters." }),
}).refine((props) => props.newPassword === props.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});