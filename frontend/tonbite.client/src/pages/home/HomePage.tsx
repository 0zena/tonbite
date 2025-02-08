import { TonConnectButton } from "@tonconnect/ui-react";
import { useAuth } from "../../provider/AuthProvider.tsx";

export const HomePage = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <header className={"flex flex-col items-center"}>
            <span>My App with React UI</span>
            <TonConnectButton />
            {isAuthenticated ? (
                <>
                    <p>IsAuth</p>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (<p>notAuth</p>)}
        </header>
    );
};
