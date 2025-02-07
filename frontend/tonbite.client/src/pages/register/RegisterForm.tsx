import { useForm } from "react-hook-form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormProps, RegisterFormSchema } from "../../states/RegisterFormProps.ts";
import { AuthService } from "../../services";

export default function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormProps>({ resolver: zodResolver(RegisterFormSchema) });

    const Submit = async (form: RegisterFormProps) => {
        await AuthService.Register(form);
    }

    return (
        <form onSubmit={handleSubmit(Submit)} className="flex flex-col w-full space-y-2">
            <Input label="email"
                   isRequired
                   {...register("email")} />
            {errors.email && (<p className="text-danger text-tiny mt-1">{errors.email.message}</p>)}
            <Input label="password"
                   isRequired
                   type="password"
                   {...register("password")} />
            {errors.password && (<p className="text-danger text-tiny mt-1">{errors.password.message}</p>)}
            <Input label="confirm password"
                   isRequired
                   type="password"
                   {...register("confirmPassword")} />
            {errors.confirmPassword && (<p className="text-danger text-tiny mt-1">{errors.confirmPassword.message}</p>)}
            <Button type="submit">Register</Button>
        </form>
    );
}
