import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import LoginFormState from "../../states/LoginFormState.ts";
import AuthService from "../../services/AuthService.ts";

export default function LoginForm() {
    const [form, setFormData] = useState<LoginFormState>({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prevData => ({...prevData, [name]: value}));
    }

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        await AuthService.Login(form);
        return window.location.reload();
    }

    return(
        <>
            <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-2">
                <Input label="email"
                       type="email"
                       name="email"
                       value={form.email}
                       onChange={handleChange} />
                <Input label="password" 
                       type="password" 
                       name="password"
                       value={form.password}
                       onChange={handleChange} />
                <Button type="submit">Login</Button>
            </form>
        </>
    );
}