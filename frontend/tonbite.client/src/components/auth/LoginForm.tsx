import React, { useState } from "react";
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
        return await AuthService.Login(form);
    }

    return(
        <>
            <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-2">
                <span className="flex w-full items-center place-content-between space-x-2">
                    <label htmlFor="email">email</label>
                    <input name="email"
                           value={form.email}
                           onChange={handleChange}
                           className="p-2 border rounded"/>
                </span>
                <span className="flex w-full items-center place-content-between space-x-2">
                    <label htmlFor="password">password</label>
                    <input name="password"
                           type="password"
                           value={form.password}
                           onChange={handleChange}
                           className="p-2 border rounded"/>
                </span>
                <button type="submit">Login</button>
            </form>
        </>
    );
}