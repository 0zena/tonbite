import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormProps, LoginFormSchema } from "../../states";
import { AuthService } from "../../services";

export default function LoginForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginFormProps>({ resolver: zodResolver(LoginFormSchema)});
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const Submit = async (form: LoginFormProps) => {
        const response = await AuthService.Login(form);
        if (response != undefined)
            setMessage(response);
        else {
            navigate("/");
            location.reload();
        }

        reset();
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
            {message && <p className="text-danger text-tiny mt-1">{message}</p>}
            <Button type="submit">Login</Button>
        </form>
    );
}