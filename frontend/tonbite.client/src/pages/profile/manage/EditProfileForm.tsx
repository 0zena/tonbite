import { Button } from "@heroui/button";
import { Input,Textarea } from "@heroui/input";
import { UserSchema, UserType } from "../../../states";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserService } from "../../../services";
import { useState } from "react";
import { ConfirmModal, useConfirmModal, ValidationError } from "../../../components";
import { useAuth } from "../../../provider/AuthProvider.tsx";

export const EditProfileForm = ({user}: {user: UserType}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<UserType>({ resolver: zodResolver(UserSchema) });
    const { isOpen, onOpenChange, confirmAction, handleConfirmResult } = useConfirmModal();
    const { setClient } = useAuth();
    const [ message, setMessage ] = useState("");

    const Submit = async (form: UserType) => {
        setMessage("");
        if (!await confirmAction()) return;

        form.id = user.id;
        const response = await UserService.update(form);
        if (response != undefined) {
            setClient(response);
            setMessage("User updated successfully.");
        }
    }

    return (
        <form onSubmit={handleSubmit(Submit)} className={"space-y-4 w-full max-w-96"}>
            <Input label={"Username"}
                   placeholder={"Add username"}
                   defaultValue={user.username}
                   {...register("username")} />
            <ValidationError error={errors.username} />
            <Input label={"Email"}
                   readOnly={true}
                   value={user.email}
                   type={"email"}
                   {...register("email")} />
            <ValidationError error={errors.email} />
            <Textarea label={"Bio"}
                      minRows={4}
                      placeholder={"Describe yourself"}
                      defaultValue={user.bio}
                      {...register("bio")} className={"h-fit"} />
            <ValidationError error={errors.bio} />
            {message && <p className="text-danger text-tiny mt-1">{message}</p>}
            <span className={"flex w-full justify-end"}>
                <Button type="submit" className={"ml-auto"} color={"danger"}>Save</Button>
            </span>
            <ConfirmModal isOpen={isOpen}
                          onOpenChange={onOpenChange}
                          onConfirm={handleConfirmResult}
                          title="Save changes?"
                          message="Are you sure you want to change your account data?" />
        </form>
    );
}