import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@heroui/react";
import { AuthService } from "../../../services";
import { ChangePasswordProps, ChangePasswordSchema } from "../../../states/ChangePasswordProps.ts";

export const ChangePassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ChangePasswordProps>({ resolver: zodResolver(ChangePasswordSchema) });
    const [message, setMessage] = useState("");

    const Submit = async (form: ChangePasswordProps) => {
        const result = await AuthService.ChangePassword(form);
        if (result !== undefined)
            setMessage(result)
    }

    return <form onSubmit={handleSubmit(Submit)} className="flex flex-col w-full space-y-2">
        <Input label="old password"
               isRequired
               type="password"
               {...register("password")} />
        {errors.password && (<p className="text-danger text-tiny mt-1">{errors.password.message}</p>)}
        <Input label="new password"
               isRequired
               type="password"
               {...register("newPassword")} />
        {errors.newPassword && (<p className="text-danger text-tiny mt-1">{errors.newPassword.message}</p>)}
        <Input label="confirm new password"
               isRequired
               type="password"
               {...register("confirmPassword")} />
        {errors.confirmPassword && (<p className="text-danger text-tiny mt-1">{errors.confirmPassword.message}</p>)}

        {message && <p className="text-danger text-tiny mt-1">{message}</p>}

        <Button type="submit">Register</Button>
    </form>
}