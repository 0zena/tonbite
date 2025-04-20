import "./App.scss"

import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { HeroUIProvider } from "@heroui/react";
import AppRouter from "./router/AppRouter.tsx";
import AuthProvider from "./provider/AuthProvider.tsx";
import { AppNavbar } from "./components";

function App() {
    return (
        <TonConnectUIProvider manifestUrl="https://ton.vote/tonconnect-manifest.json">
            <AuthProvider>
                <HeroUIProvider>
                    <div className="h-full">
                        <AppNavbar />
                        <AppRouter />
                    </div>
                </HeroUIProvider>
            </AuthProvider>
        </TonConnectUIProvider>
    )
}

export default App
