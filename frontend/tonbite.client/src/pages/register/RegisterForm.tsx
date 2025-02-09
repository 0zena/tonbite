import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormProps, RegisterFormSchema } from "../../states";
import { AuthService } from "../../services";

export default function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormProps>({ resolver: zodResolver(RegisterFormSchema) });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const Submit = async (form: RegisterFormProps) => {
        const response = await AuthService.Register(form);
        if (response != undefined)
            setMessage(response);
        else navigate("/login");
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
            {message && <p className="text-danger text-tiny mt-1">{message}</p>}
            <Button type="submit">Register</Button>
        </form>
    );
}
