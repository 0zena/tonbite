import LoginForm from "./LoginForm.tsx";
import { Link } from "react-router-dom";

export const LoginPage = () => {
    return(
        <div className="flex flex-col max-w-96 mx-auto space-y-2">
            <h1>Login</h1>
            <LoginForm />
            <div className={"flex space-x-2"}>
                <p>Don`t have an account?</p>
                <Link to="/register" className={"text-primary hover:underline"}>Register</Link>
            </div>
        </div>
    );
}