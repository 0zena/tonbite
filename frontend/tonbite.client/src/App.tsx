import "./App.scss"

import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { HeroUIProvider } from "@heroui/react";
import AppRouter from "./router/AppRouter.tsx";
import AuthProvider from "./provider/AuthProvider.tsx";
import { AppNavbar, Footer } from "./components";

function App() {
    return (
        <TonConnectUIProvider manifestUrl="https://ton.vote/tonconnect-manifest.json">
            <AuthProvider>
                <HeroUIProvider className={"app-overlay"}>
                    <AppNavbar />
                    <main className={"h-full p-4"}>
                        <AppRouter />
                    </main>
                    <Footer />
                </HeroUIProvider>
            </AuthProvider>
        </TonConnectUIProvider>
    )
}

export default App
