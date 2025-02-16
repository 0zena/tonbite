import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { AuthService } from "../../../services";
import { ChangePasswordProps, ChangePasswordSchema } from "../../../states";
import { ConfirmModal, useConfirmModal } from "../../../components";

export const ChangePasswordForm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ChangePasswordProps>({ resolver: zodResolver(ChangePasswordSchema) });
    const { isOpen, onOpenChange, confirmAction, handleConfirmResult } = useConfirmModal();
    const [message, setMessage] = useState("");

    const Submit = async (form: ChangePasswordProps) => {
        setMessage("");
        if (!await confirmAction()) return;

        const result = await AuthService.ChangePassword(form);
        if (result !== undefined)
            setMessage(result)

        reset();
    }

    return <form onSubmit={handleSubmit(Submit)} className="w-full space-y-4 max-w-96">
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

        <span className={"flex w-full justify-end"}>
            <Button type="submit" className={"ml-auto"} color={"danger"}>Change</Button>
        </span>
        <ConfirmModal isOpen={isOpen}
                      onOpenChange={onOpenChange}
                      onConfirm={handleConfirmResult}
                      title="Confirm Change"
                      message="Are you sure you want to change your password?" />
    </form>
}