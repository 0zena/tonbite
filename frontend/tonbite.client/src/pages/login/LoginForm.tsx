import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormProps, LoginFormSchema } from "../../states";
import { AuthService } from "../../services";
import { ValidationError } from "../../components";
import { useAuth } from "../../provider/AuthProvider.tsx";

export default function LoginForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginFormProps>({ resolver: zodResolver(LoginFormSchema)});
    const { setToken } = useAuth();
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const Submit = async (form: LoginFormProps) => {
        const response = await AuthService.login(form);
        if (response)
            setMessage(response);
        else {
            setToken(localStorage.getItem("accessToken"));
            navigate("/profile");
        }

        reset();
    }

    return(
        <form onSubmit={handleSubmit(Submit)} className="flex flex-col w-full space-y-2">
            <Input label="email"
                   isRequired
                   type="email"
                   {...register("email")} />
            <ValidationError error={errors.email} />
            <Input label="password"
                   isRequired
                   type="password"
                   {...register("password")} />
            <ValidationError error={errors.password} />
            {message && <p className="text-danger text-tiny mt-1">{message}</p>}
            <Button type="submit">Login</Button>
        </form>
    );
}