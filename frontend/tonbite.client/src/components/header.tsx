import  { TonConnectButton } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
import AuthService from "../services/AuthService.ts";
import UserState from "../states/UserState.ts";

const Header = () => {
    const [user, setUser] = useState<UserState>();


    useEffect(() => {
        const getUser = async () => {
            const data = await AuthService.GetUser()
            setUser(data);
        }

        getUser();
    }, []);


    return (
        <header className={"flex flex-col"}>
            <span>My App with React UI</span>
            <TonConnectButton />

            <p>{user?.email}</p>
        </header>
    );
};

export default Header;