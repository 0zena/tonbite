import RegisterForm from "./RegisterForm.tsx";
import { Link } from "react-router-dom";
import Tonbite from "../../assets/tonbite.svg";

export const RegisterPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8 px-4">
            <div className="flex flex-col items-center space-y-4 text-center">
                <img src={Tonbite} alt="Tonbite Logo" className="w-24 h-24 drop-shadow-[0_0_15px_rgba(0,152,234,0.5)]" />
                <h1 className="text-4xl font-bold text-gradient">Join Tonbite</h1>
                <p className="text-xl text-white/80 max-w-2xl">
                    Create your account and start your journey in decentralized education. Learn, create, and earn with TON blockchain.
                </p>
            </div>

            <div className="flex flex-col max-w-96 w-full space-y-4">
                <RegisterForm />
                <div className="flex justify-center space-x-2">
                    <p className="text-white/70">Already have an account?</p>
                    <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors">Sign in</Link>
                </div>
            </div>
        </div>
    );
};