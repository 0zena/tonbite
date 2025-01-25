import "./App.scss"

import {TonConnectUIProvider} from "@tonconnect/ui-react";
import {NextUIProvider} from "@nextui-org/react";
import AppRouter from "./router/AppRouter.tsx";
import AuthProvider from "./provider/AuthProvider.tsx";

function App() {
    return (
        <TonConnectUIProvider manifestUrl="https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json">
            <AuthProvider>
                <NextUIProvider>
                    <AppRouter/>
                </NextUIProvider>
            </AuthProvider>
        </TonConnectUIProvider>
    )
}

export default App
