import RegisterForm from "../../components/auth/RegisterForm.tsx";

export default function RegisterPage() {
    return (
        <>
            <div className="flex flex-col max-w-96 mx-auto space-y-2">
                <h1>Register</h1>
                <RegisterForm />
            </div>
        </>
    );
}