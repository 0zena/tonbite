import { useForm } from "react-hook-form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormProps, LoginFormSchema } from "../../states/LoginFormProps.ts";
import { AuthService } from "../../services";

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormProps>({ resolver: zodResolver(LoginFormSchema)});

    const Submit = async (form: LoginFormProps) => {
        await AuthService.Login(form);
    }

    return(
        <form onSubmit={handleSubmit(Submit)} className="flex flex-col w-full space-y-2">
            <Input label="email"
                   isRequired
                   type="email"
                   {...register("email")} />
            {errors.email && (<p className="text-danger text-tiny mt-1">{errors.email.message}</p>)}
            <Input label="password"
                   isRequired
                   type="password"
                   {...register("password")} />
            {errors.password && (<p className="text-danger text-tiny mt-1">{errors.password.message}</p>)}
            <Button type="submit">Login</Button>
        </form>
    );
}