import  { TonConnectButton } from "@tonconnect/ui-react";
import { useAuth } from "../provider/AuthProvider.tsx";

const Header = () => {
    const { isAuthenticated } = useAuth();

    return (
        <header className={"flex flex-col items-center"}>
            <span>My App with React UI</span>
            <TonConnectButton />
            {isAuthenticated ? (<p>IsAuth</p>) : (<p>notAuth</p>)}
        </header>
    );
};

export default Header;