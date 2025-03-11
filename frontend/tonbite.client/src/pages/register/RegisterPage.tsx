import RegisterForm from "./RegisterForm.tsx";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
    return (
        <>
            <div className="flex flex-col max-w-96 mx-auto space-y-2">
                <h1>Register</h1>
                <RegisterForm />
                <div className={"flex space-x-2"}>
                    <p>Already have an account?</p>
                    <Link to="/login" className={"text-primary hover:underline"}>Login</Link>
                </div>
            </div>
        </>
    );
}