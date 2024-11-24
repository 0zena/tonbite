import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import RegisterFormState from "../../states/RegisterFormState.ts";
import AuthService from "../../services/AuthService.ts";

export default function RegisterForm() {
    const [form, setFormData] = useState<RegisterFormState>({
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prevData => ({...prevData, [name]: value}));
    }

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        await AuthService.Signup(form);
        return navigate("/login");
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-2">
                <Input name="userName"
                       label="username"
                       value={form.userName}
                       onChange={handleChange} />
                <Input name="firstName"
                       label="first name"
                       value={form.firstName}
                       onChange={handleChange} />
                <Input name="lastName"
                       label="last name"
                       value={form.lastName}
                       onChange={handleChange} />
                <Input name="email"
                       label="email"
                       value={form.email}
                       onChange={handleChange} />
                <Input name="password"
                       label="password"
                       type="password"
                       value={form.password}
                       onChange={handleChange} />
                <Input name="confirmPassword"
                       label="confirm password"
                       type="password"
                       onChange={handleChange} />
                <Button type="submit">Register</Button>
            </form>
        </>
    );
}
