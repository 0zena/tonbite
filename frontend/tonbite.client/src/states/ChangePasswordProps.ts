import { z, ZodType} from "zod";

export type ChangePasswordProps = {
    newPassword: string,
    password: string,
    confirmPassword: string,
}

export const ChangePasswordSchema : ZodType<ChangePasswordProps> = z.object({
   newPassword: z.string(),
   password: z.string(),
   confirmPassword: z.string()
}).refine((props) => props.newPassword === props.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});