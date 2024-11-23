import React, { useState } from "react";
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prevData => ({...prevData, [name]: value}));
    }

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        return await AuthService.Signup(form);
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-2">
                <span className="flex w-full items-center place-content-between space-x-2">
                    <label htmlFor="userName" className="">username</label>
                    <input name="userName"
                           value={form.userName}
                           onChange={handleChange}
                           className="p-2 border rounded"/>
                </span>
                <span className="flex w-full items-center place-content-between space-x-2">
                    <label htmlFor="firstName">first name</label>
                    <input name="firstName"
                           value={form.firstName}
                           onChange={handleChange}
                           className="p-2 border rounded"/>
                </span>
                <span className="flex w-full items-center place-content-between space-x-2">
                    <label htmlFor="lastName">last name</label>
                    <input name="lastName"
                           value={form.lastName}
                           onChange={handleChange}
                           className="p-2 border rounded"/>
                </span>
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
                <span className="flex w-full items-center place-content-between space-x-2">
                    <label htmlFor="confirmPassword">confirm</label>
                    <input name="confirmPassword"
                           type="password"
                           onChange={handleChange}
                           className="p-2 border rounded" />
                </span>
                <button type="submit">Register</button>
            </form>
        </>
    );
}
