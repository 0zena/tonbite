import  { TonConnectButton } from "@tonconnect/ui-react";
import TestRequest from "./test-request";

export const Header = () => {
    return (
        <header>
            <span>My App with React UI</span>
            <TonConnectButton />
            <TestRequest />
        </header>
    );
};