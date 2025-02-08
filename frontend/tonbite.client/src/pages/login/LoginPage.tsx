import LoginForm from "./LoginForm.tsx";

export const LoginPage = () => {
    return(
        <>
            <div className="flex flex-col max-w-96 mx-auto space-y-2">
                <h1>Login</h1>
                <LoginForm />
            </div>
        </>
    );
}