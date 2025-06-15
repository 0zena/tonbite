import { TonConnectButton } from "@tonconnect/ui-react";

export const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center max-h-full h-full">
            <h1 className="text-4xl font-bold text-gradient">Welcome back!</h1>
            <p className="text-xl my-4">Start exploring courses or create your own.</p>
            <TonConnectButton />
        </div>
    );
};
