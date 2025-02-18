import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormProps, RegisterFormSchema } from "../../states";
import { AuthService } from "../../services";
import { ValidationError } from "../../components";

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
            <ValidationError error={errors.email} />
            <Input label="password"
                   isRequired
                   type="password"
                   {...register("password")} />
            <ValidationError error={errors.password} />
            <Input label="confirm password"
                   isRequired
                   type="password"
                   {...register("confirmPassword")} />
            <ValidationError error={errors.confirmPassword} />
            {message && <p className="text-danger text-tiny mt-1">{message}</p>}
            <Button type="submit">Register</Button>
        </form>
    );
}
