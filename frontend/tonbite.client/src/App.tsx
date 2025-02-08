import "./App.scss"

import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { HeroUIProvider } from "@heroui/react";
import AppRouter from "./router/AppRouter.tsx";
import AuthProvider from "./provider/AuthProvider.tsx";
import { AppNavbar } from "./components";

function App() {
    return (
        <TonConnectUIProvider manifestUrl="https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json">
            <AuthProvider>
                <HeroUIProvider>
                    <AppNavbar />
                    <AppRouter />
                </HeroUIProvider>
            </AuthProvider>
        </TonConnectUIProvider>
    )
}

export default App
