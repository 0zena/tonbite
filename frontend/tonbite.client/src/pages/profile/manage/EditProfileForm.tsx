import { Button, Input, Textarea } from "@heroui/react";
import { UserSchema, UserType } from "../../../states";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const EditProfileForm = ({user}: {user: UserType}) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<UserType>({ resolver: zodResolver(UserSchema) });

    const Submit = async (form: UserType) => {

        reset();
    }

    return <form onSubmit={handleSubmit(Submit)} className={"space-y-4 w-full max-w-96"}>
            <Input label={"Username"}
                   placeholder={"Add username"}
                   value={user.username}
                   {...register("username")} />
            {errors.username && (<p className="text-danger text-tiny mt-1">{errors.username.message}</p>)}
            <Input label={"Email"}
                   value={user.email}
                   type={"email"}
                   {...register("email")} />
            {errors.email && (<p className="text-danger text-tiny mt-1">{errors.email.message}</p>)}
            <Textarea label={"Bio"}
                      minRows={4}
                      placeholder={"Describe yourself"}
                      value={user.bio}
                      {...register("bio")} className={"h-fit"} />
            {errors.bio && (<p className="text-danger text-tiny mt-1">{errors.bio.message}</p>)}
            <Button type={"submit"}>Change</Button>
        </form>
}