import LoginForm from "../../components/auth/LoginForm";

export default function LoginPage() {
    return(
        <>
            <div className="flex flex-col max-w-96 mx-auto space-y-2">
                <h1>Login</h1>
                <LoginForm />
            </div>
        </>
    );
}